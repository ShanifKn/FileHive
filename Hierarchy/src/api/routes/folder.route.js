import FolderService from "../../services/folder.service.js";
import { tryCatch } from "../../utils/index.js";
import { Authentication } from "../middlewares/authentication.js";
import FolderExist from "../validations/existCheck.js";
import { SchemaValidationForFolder } from "../validations/schema.validation.js";
import Validate from "../validations/validator.js";

const FolderRouter = (app) => {
  const service = new FolderService();

  const existCheck = new FolderExist();

  // @route   GET /
  // @des     For health check
  // @access  Public
  app.get(
    "",
    tryCatch(async (req, res) => {
      return res.status(200).json("Running");
    })
  );

  // @route   POST /folders
  // @desc    Create a new folder
  // @access  Private
  app.post(
    "/folders",
    SchemaValidationForFolder,
    Authentication,
    Validate,
    tryCatch(async (req, res) => {
      const { name, parentFolder } = req.body;

      const userId = req.user._id;

      await existCheck.ForFolderName({ name, parentFolder });

      await existCheck.ForFolderParent({ _id: parentFolder });

      const { message } = await service.CreateFolder({ name, parentFolder, userId });

      return res.status(201).json({ message });
    })
  );

  // @route   PUT /folders/:id
  // @desc    Update a folder's name or parent
  // @access  Private
  app.put(
    "/folders/:_id",
    SchemaValidationForFolder,
    Authentication,
    Validate,
    tryCatch(async (req, res) => {
      const { _id } = req.params;

      const { name } = req.body;

      await existCheck.ForFolder({ _id });

      const { message } = await service.UpdateFolder({ _id, name });

      return res.status(200).json({ message });
    })
  );

  // @route   GET /viewstore
  // @desc    Get root-level folders for the authenticated user
  // @access  Private
  app.get(
    "/viewstore",
    Authentication,
    Validate,
    tryCatch(async (req, res) => {
      const userId = req.user._id;

      const data = await service.GetUserFolder({ userId });

      return res.status(200).json({ data });
    })
  );
};

export default FolderRouter;
