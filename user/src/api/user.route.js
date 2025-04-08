import { tryCatch } from "../utils/index.js";
import { SignupRateLimiter } from "./middlewares/apiLimiter.js";
import { SchemaValidationForSignup } from "./validations/schema.validation.js";
import Validate from "./validations/validator.js";


const UsersRouter = (app) => {

      // @route   GET /
      // @des     For health check
      // @access  Public
      app.get(
            "",
            tryCatch(async (req, res) => {
                  return res.status(200).json("Running");
            })
      );

      // @route  POST /signup
      // @des    New user signup
      // @access Public
      // @fields name, email, password
      app.post(
            "/signup",
            SignupRateLimiter,
            SchemaValidationForSignup,
            Validate,
            tryCatch(async (req, res) => {
                  const {
                        name, email, password
                  } = req.body;

                  //check if the user  already exist with given email
                  await userExists.ForSignUp({ name, email, password });

                  //create a new user
                  const { message } = await service.CreateUser({
                        name, email, password
                  });

                  return res.status(201).json({ message });
            })
      );

}




export default UsersRouter;
