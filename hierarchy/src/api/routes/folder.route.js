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



  // @route   GET /filter
  // @desc    Get Search term to filter documents by title or content.
  // @access  Private
  app.get(
    "/filter",
    Authentication,
    Validate,
    tryCatch(async (req, res) => {

      const { search } = req.query;

      const data = await service.GetSearchQuery({ search });

      return res.status(200).json({ data });
    })
  );


  // @route   GET /viewstore/:folderId
  // @desc    Get contents of a folder: subfolders + documents
  // @access  Private
  app.get(
    "/viewstore/:folderId",
    Authentication,
    Validate,
    tryCatch(async (req, res) => {

      const folderId = req.params.folderId;

      const userId = req.user._id;

      await existCheck.ForFolder({ _id: folderId });

      const data = await service.GetFolderDetails({ folderId, userId });

      return res.status(200).json({ data });
    })
  );


  // @route   DELETE /folders/:id
  // @desc    Delete a folder by ID
  // @access  Private
  app.delete(
    "/folders/:id",
    Authentication,
    Validate,
    tryCatch(async (req, res) => {

      const folderId = req.params.id;

      await existCheck.ForFolder({ _id: folderId });

      await service.DeleteFolder({ folderId })

      return res.status(200).json({ message: "Folder deleted successfully." });
    })
  );


};

export default FolderRouter;
