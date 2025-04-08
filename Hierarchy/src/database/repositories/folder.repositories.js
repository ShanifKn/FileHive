import { Folder } from "../models/folder.model.js";

class FolderRepository {
      async CreateFolder({ name, parentFolder, userId }) {
            return await Folder.create({
                  name,
                  parentFolder: parentFolder || null,
                  createdBy: userId,
            });
      }

      async CountUserByFolder({ _id }) {
            return await Folder.countDocuments({
                  _id,
            });
      }

      async CountUserByFolderName({ name }) {
            return await Folder.countDocuments({
                  name,
            });
      }


      async UpdateFolder({ _id, name }) {
            return Folder.findByIdAndUpdate(
                  _id,
                  { name },
                  { new: true }
            );
      }


      async GetUserFolder({ userId }) {
            return Folder.find({
                  createdBy: userId,
                  parentFolder: null,
            });
      }
}

export default FolderRepository;
