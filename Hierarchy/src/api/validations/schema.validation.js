import { check } from "express-validator";
import { AppError } from "../../utils/index.js";
import mongoose from "mongoose";
import { INVALID_PARENT_ID } from "../constants/errorCodes.js";


export const SchemaValidationForFolder = [
      // Name: Required, Trimmed
      check("name")
            .trim()
            .notEmpty()
            .withMessage("Folder name is mandatory"),

      // parentFolder: Optional, must be valid ObjectId if provided
      check("parentFolder")
            .optional()
            .custom((id) => {
                  if (!mongoose.isValidObjectId(id)) {
                        throw new AppError(INVALID_PARENT_ID, "Invalid Parent ID", 400);
                  }
                  return true;
            }),
];


export const SchemaValidationForFolderUpdate = [
      // Name: Required, Trimmed
      check("name")
            .trim()
            .notEmpty()
            .withMessage("Folder name is mandatory"),

];


export const SchemaValidationForDocument = [

      // Title: Required, Trimmed
      check("title")
            .trim()
            .notEmpty()
            .withMessage("Document title is mandatory"),

      // Content: Optional, but if provided, should be a string
      check("content")
            .optional()
            .isString()
            .withMessage("Content must be a string"),


      check("folder")
            .optional()
            .custom((id) => {
                  if (!mongoose.isValidObjectId(id)) {
                        throw new AppError(INVALID_PARENT_ID, "Invalid Parent ID", 400);
                  }
                  return true;
            }),

]