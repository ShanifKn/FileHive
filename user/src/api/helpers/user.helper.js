import UserRepository from "../../database/repositories/user.repositories.js";
import bcrypt from "bcrypt";
import { PASSWORD_MISSMATCHED } from "../constants/errorCodes.js";
import { JWT_OPTIONS, JWT_SECRET, PRIVATE_KEY } from "../../config/index.js";
import { AppError } from "../../utils/index.js";


class UserHelper {

      constructor() {
            this.repository = new UserRepository()
      }


      async CreateNewUser({ name, email, password }) {
            //convert password to hash
            password = await CreateHash(password);

            await this.repository.CreateNewUser({ name, email, password })
      }

      async UserLogin({ email, password }) {
            const user = await this.repository.FindOneUserEmail({ email });

            const isMatched = await this.ValidateHashPassword(password, user.password);

            if (!isMatched) throw new AppError(PASSWORD_MISSMATCHED, "Invalid password & email", 400);

            const token = await this.GenerateSignedJwt(user, role);

            const message = "Login successful";

            return { message, token };
      }


      async FindUserById({ _id }) {
            return await this.repository.FindUserById({ _id })
      }


      async CreateHash({ password }) {
            const saltRounds = 10; // The cost factor determines the computational complexity of the hashing process

            // Generate a salt
            const salt = bcrypt.genSaltSync(saltRounds);

            // Concatenate the password and private key
            const combinedValue = PRIVATE_KEY + password + PRIVATE_KEY;

            // Generate the bcrypt hash
            return await bcrypt.hashSync(combinedValue, salt);
      }



      async ValidateHashPassword({ password, hashPassword }) {
            // Concatenate the user's input password with the private key
            const combinedValue = PRIVATE_KEY + password + PRIVATE_KEY;

            return bcrypt.compare(combinedValue, hashPassword);
      }



      async GenerateSignedJwt(user, role) {
            const tokenUser = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
            };

            return jwt.sign(tokenUser, JWT_SECRET, JWT_OPTIONS);
      }


}



export default UserHelper;