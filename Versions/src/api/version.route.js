
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

                  const { documentId, versionNumber, fileUrl } = req.body

                  const data = await service.CreateVersion({ documentId, versionNumber, fileUrl })

                  return res.status(200).json({ data });
            })
      );



};

export default VersionRouter;
