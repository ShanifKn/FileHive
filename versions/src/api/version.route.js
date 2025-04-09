import VersionService from "../services/version.service.js";
import { tryCatch } from "../utils/index.js";
import { Authentication } from "./middlewares/authentication.js";
import { SchemaValidationForVersion } from "./validations/schema.validation.js";
import Validate from "./validations/validator.js";

const VersionRouter = (app) => {
  const service = new VersionService();

  // @route   POST /add-version
  // @desc    Upload a new version for a document
  // @access  Private
  app.post(
    "/add-version",
    Authentication,
    SchemaValidationForVersion,
    Validate,
    tryCatch(async (req, res) => {
      const { documentId, versionNumber, fileUrl } = req.body;

      const data = await service.CreateVersion({ documentId, versionNumber, fileUrl });

      return res.status(200).json({ data });
    })
  );

  // @route   GET /versions/:id
  // @desc    Upload a new version for a document
  // @access  Private
  app.get(
    "/versions/:id",
    Authentication,
    Validate,
    tryCatch(async (req, res) => {
      const documentId = req.params.id;

      const data = await service.GetAllVersions({ documentId });

      return res.status(200).json({ data });
    })
  );


  // @route   DELETE /documents/:id
  // @desc    Delete a documents all versions
  // @access  Private
  app.delete(
    "/documents/:id",
    Authentication,
    tryCatch(async (req, res) => {
      const documentId = req.params.id;

      await service.DeleteDocumentAndVersions({documentId});

      return res.status(200).json({ message: "Document and all versions deleted successfully." });
    })
  );
};

export default VersionRouter;
