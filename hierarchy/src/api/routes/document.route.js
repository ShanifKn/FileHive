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
  // @desc    Create a new document
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

  // @route   GET /documents/:id/versions
  // @desc    Retrieve all versions for a document
  // @access  Private
  app.get(
    "/documents/:id/versions",
    Authentication,
    tryCatch(async (req, res) => {
      const documentId = req.params.id;

      await existCheck.ForDocument({ _id: documentId });

      const data = await service.GetAllVersions({ documentId, token: req.header("x-auth-token") });

      return res.status(200).json({ data });
    })
  );

  // @route   GET /documents/:id
  // @desc    Retrieve document details with the latest version
  // @access  Private
  app.get(
    "/documents/:id",
    Authentication,
    tryCatch(async (req, res) => {
      const documentId = req.params.id;

      // Check if the document exists
      await existCheck.ForDocument({ _id: documentId });

      const data = await service.GetDocumentDetails({ documentId, token: req.header("x-auth-token") });

      return res.status(200).json({ data });
    })
  );

  // @route   PUT /documents/:id
  // @desc    Update document details
  // @access  Private
  app.put(
    "/documents/:id",
    Authentication,
    Validate,
    tryCatch(async (req, res) => {
      const documentId = req.params.id;
      const { title, content } = req.body;

      await existCheck.ForDocument({ _id: documentId });

      const { message } = await service.UpdateDocument({ documentId, title, content });

      return res.status(200).json({ message });
    })
  );

  // @route   DELETE /documents/:id
  // @desc    Delete a document and all versions
  // @access  Private
  app.delete(
    "/documents/:id",
    Authentication,
    tryCatch(async (req, res) => {
      const documentId = req.params.id;

      await existCheck.ForDocument({ _id: documentId });

      await service.DeleteDocumentAndVersions({documentId, token: req.header("x-auth-token") });

      return res.status(200).json({ message: "Document deleted." });
    })
  );



  // @route   GET /total-documents
  // @desc    Return total documents count for the authenticated user
  // @access  Private
  app.get(
    "/total-documents",
    Authentication,
    Validate,
    tryCatch(async (req, res) => {

      const userId = req.user._id;

      const data = await service.countDocuments({ userId });

      return res.status(200).json({ data });
    })
  );


};

export default DocumentRouter;
