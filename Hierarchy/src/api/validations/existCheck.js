
import FolderRepository from "../../database/repositories/folder.repositories.js";
import { AppError } from "../../utils/index.js";
import { FOLDER_NOT_FOUND, FOLDER_FOUND } from "../constants/errorCodes.js";



class FolderExist {
      constructor() {
            this.repository = new FolderRepository()

      }

      async ForFolder({ _id }) {
            let folderCount = await this.repository.CountUserByFolder({ _id });

            if (folderCount <= 0) throw new AppError(FOLDER_NOT_FOUND, "No folder found", 404);
      }

      async ForFolderName({ name }) {
            let folderCount = await this.repository.CountUserByFolderName({ name });

            if (folderCount > 0) throw new AppError(FOLDER_FOUND, "Please Rename folder name", 404);
      }


      async ForFolderParent({ _id }) {

            if (!_id) return

            let folderCount = await this.repository.CountUserByFolder({ _id });

            if (folderCount <= 0) throw new AppError(FOLDER_NOT_FOUND, "No Parent folder found", 404);
      }

}



export default FolderExist;