import UserService from "../services/user.service.js";
import { tryCatch } from "../utils/index.js";
import { LoginRateLimiter, SignupRateLimiter } from "./middlewares/apiLimiter.js";
import { Authentication } from "./middlewares/authentication.js";
import UserExist from "./validations/existCheck.js";
import { SchemaValidationForLogin, SchemaValidationForSignup } from "./validations/schema.validation.js";
import Validate from "./validations/validator.js";

const UsersRouter = (app) => {
  const userExists = new UserExist();

  const service = new UserService();

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
      const { name, email, password } = req.body;

      //check if the user  already exist with given email
      await userExists.ForSignUp({ name, email, password });

      //create a new user
      const { message } = await service.CreateNewUser({
        name,
        email,
        password,
      });

      return res.status(201).json({ message });
    })
  );

  // @route   POST /login
  // @desc    user login
  // @access  Public
  // @fields  email ,password
  app.post(
    "/login",
    LoginRateLimiter,
    SchemaValidationForLogin,
    Validate,
    tryCatch(async (req, res) => {
      const { email, password } = req.body;

      //Check if user already exists with given email and role
      await userExists.ForLogin({ email });

      const { message, token } = await service.UserLogin({ email, password });

      return res.status(200).json({ message, token });
    })
  );

  //@route GET /profile
  // @desc  get user  profile
  // @access  Private
  app.get(
    "/profile",
    Authentication,
    Validate,
    tryCatch(async (req, res) => {
      const _id = req.user._id;

      const data = await service.FindUserById({ _id });

      return res.status(200).json({ data });
    })
  );
};

export default UsersRouter;
