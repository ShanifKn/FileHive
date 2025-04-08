import { AppError } from "../../utils/index.js";
import { HASH_NOT_FOUND, PASSWORD_MISSMATCHED, TOKEN_NOT_FOUND, USER_ALREADY_EXISTS } from "../constants/errorCodes.js";
import { USER_NOT_FOUND } from "../constants/errorCodes.js";


class UserExist {
      constructor() { }


      async ForSignUp({ email }) {
            let userCount = await this.repository.CountUserByEmail({ email });

            if (userCount > 0) throw new AppError(USER_ALREADY_EXISTS, "User already exists with this Email ID. Please login", 400);
      }

}