import { Folder } from "../models/folder.model.js";

class FolderRepository {
      async CreateFolder({ name, parentFolder, userId }) {
            return await Folder.create({
                  name,
                  parentFolder: parentFolder || null,
                  createdBy: userId,
            });
      }

      async CountByFolder({ _id }) {
            return await Folder.countDocuments({
                  _id,
            });
      }


      async UpdateFolder({ _id, name }) {
            return Folder.findByIdAndUpdate(
                  _id,
                  { name },
                  { new: true }
            );
      }


      async CountByFolderName({ name, parentFolder }) {
            return await Folder.countDocuments({
                  name,
                  parentFolder: parentFolder ?? null,
            });
      }



      async GetUserFolder({ userId }) {
            return Folder.find({
                  createdBy: userId,
                  parentFolder: null,
            }).select("-createdBy -createdAt -updatedAt -__v");
      }
}

export default FolderRepository;
