import { check } from "express-validator";
import { AppError } from "../../utils/index.js";
import mongoose from "mongoose";
import { INVALID_PARENT_ID } from "../constants/errorCodes.js";




export const SchemaValidationForVersion = [

      check("documentId")
            .optional()
            .custom((id) => {
                  if (!mongoose.isValidObjectId(id)) {
                        throw new AppError(INVALID_PARENT_ID, "Invalid Document ID", 400);
                  }
                  return true;
            }),


      check("versionNumber")
            .trim()
            .notEmpty()
            .withMessage("Version Number is mandatory"),


      check("fileUrl")
            .notEmpty()
            .withMessage("File Url is required")
            .bail()
            .isURL({
                  require_protocol: true,
                  require_tld: false, // Allow localhost
                  allow_underscores: true,
                  allow_protocol_relative_urls: true,
            })
            .withMessage("Invalid URL format")



]