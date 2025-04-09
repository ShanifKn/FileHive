import { Authentication } from "../middlewares/authentication.js";
import { convertToWebP, uploadSingleFile } from "../middlewares/multer.js";
import { tryCatch } from "../../utils/index.js";
import { SchemaValidationForFolder, SchemaValidationForDocument } from "../validations/schema.validation.js";
import Validate from "../validations/validator.js";
import FolderExist from "../validations/existCheck.js";
import DocumentService from "../../services/document.service.js";
import { BASE_URL, IMAGE_BASE_URL } from "../../config/index.js";

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

                  await existCheck.ForFolder({ _id: folder });

                  const { message } = await service.CreateDocument({ title, content, folder, userId });

                  return res.status(201).json({ message });
            })
      );

      // @route   POST /documents/:id/version
      // @desc    Upload a new version for a document
      // @access  Private
      app.post(
            "/documents/:id/version",
            Authentication,
            uploadSingleFile,
            convertToWebP,
            Validate,
            tryCatch(async (req, res) => {
                  const documentId = req.params.id;

                  const { versionNumber } = req.body;

                  const fileUrl = `${IMAGE_BASE_URL}/${req.file?.filename ?? image}`;

                  await existCheck.ForDocument({ _id: documentId });

                  const data = await service.UploadVersion({ documentId, versionNumber, fileUrl, token: req.header("x-auth-token") });

                  return res.status(200).json({ data });
            })
      );
};

export default DocumentRouter;
