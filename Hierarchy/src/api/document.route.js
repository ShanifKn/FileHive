import { Authentication } from "./middlewares/authentication.js";
import { convertToWebP, uploadSingleFile } from "./middlewares/multer.js";
import { tryCatch } from "../utils/index.js";
import { SchemaValidationForFolder, SchemaValidationForDocument } from "./validations/schema.validation.js";
import Validate from "./validations/validator.js";
import FolderExist from "./validations/existCheck.js";
import DocumentService from "../services/document.service.js";


const DocumentRouter = (app) => {

      const existCheck = new FolderExist();

      const service = new DocumentService();


      // @route   POST /documents
      // @desc    Create a new document (placeholder, no file)
      // @access  Private
      app.post(
            "/documents",
            SchemaValidationForDocument,
            Authentication,
            Validate,
            tryCatch(async (req, res) => {
                  const { title, content, folder } = req.body;
                  const userId = req.user._id;

                  await existCheck.ForFolder({ _id: folder }); // optional, if you want to ensure folder exists

                  const { message } = await service.CreateDocument({ title, content, folder, userId });

                  return res.status(201).json({ message });
            })
      );


}




export default DocumentRouter