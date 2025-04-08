import UserRepository from "../../database/repositories/user.repositories.js";
import { AppError } from "../../utils/index.js";
import { USER_ALREADY_EXISTS } from "../constants/errorCodes.js";
import { USER_NOT_FOUND } from "../constants/errorCodes.js";


class UserExist {
      constructor() {
            this.repository = new UserRepository()
      }


      async ForSignUp({ email }) {
            let userCount = await this.repository.CountUserByEmail({ email });

            if (userCount > 0) throw new AppError(USER_ALREADY_EXISTS, "User already exists with this Email ID. Please login", 404);
      }


      async ForLogin({ email }) {
            let userCount = await this.repository.CountUserByEmail({ email });

            if (userCount < 0) throw new AppError(USER_NOT_FOUND, "No verified user found with provided details.", 404);
      }

}



export default UserExist;