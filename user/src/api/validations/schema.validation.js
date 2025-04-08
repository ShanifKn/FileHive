import { check } from "express-validator";


export const SchemaValidationForSignup = [
      check("email")
            .notEmpty()
            .withMessage("Email is mandatory")
            .isEmail()
            .withMessage("Invalid email address")
            .normalizeEmail(),


      //name ,check validity
      check("name")
            .trim()
            .notEmpty()
            .withMessage("Name is mandatory"),


      // password, check validity
      check("password")
            .trim()
            .notEmpty()
            .withMessage("Password is mandatory")
            .isLength({ min: 6 })
            .withMessage("Password should be of minimum 6 character"),

]