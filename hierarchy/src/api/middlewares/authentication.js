import jwt from "jsonwebtoken";
import { AppError, tryCatch } from "../../utils/index.js";
import { TOKEN_VERIFICATION_FAIL } from "../constants/errorCodes.js";
import { JWT_SECRET } from "../../config/index.js";

const Authentication = tryCatch(async (req, res, next) => {
      //get token from headers
      const token = req.header("x-auth-token");

      //check if not token
      if (!token)
            throw new AppError(
                  TOKEN_VERIFICATION_FAIL,
                  "No token ,authorization denied",
                  401
            );

      //verify token
      req.user = jwt.verify(token, JWT_SECRET);

      next();
});



export { Authentication };

