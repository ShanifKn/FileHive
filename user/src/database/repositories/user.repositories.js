import { Users } from "../models/user.model.js";

class UserRepository {

      // finding email from the database to check this email exists => will return number
      async CountUserByEmail({ email }) {
            return await Users.countDocuments({
                  email,
            });
      }

      // for adding User
      async CreateNewUser({ name, email, password }) {
            return await Users.create({
                  name, email, password
            });
      }

      // find user by email  to get the user data
      async FindOneUserEmail({ email }) {
            return await Users.findOne({ email }).select("-createdAt -updatedAt -__v").lean();
      }

      async FindUserById({ _id }) {
            return await Users.findById({ _id }).select(" -password -__v ").lean();
      }

}


export default UserRepository