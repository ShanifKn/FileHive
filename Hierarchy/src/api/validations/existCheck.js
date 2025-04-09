
import DocumentRepository from "../../database/repositories/document.repositories.js";
import FolderRepository from "../../database/repositories/folder.repositories.js";
import { AppError } from "../../utils/index.js";
import { FOLDER_NOT_FOUND, FOLDER_FOUND } from "../constants/errorCodes.js";



class FolderExist {
      constructor() {
            this.repository = new FolderRepository()
            this.documentRep = new DocumentRepository()

      }

      async ForFolder({ _id }) {
            let folderCount = await this.repository.CountByFolder({ _id });

            if (folderCount <= 0) throw new AppError(FOLDER_NOT_FOUND, "No folder found", 404);
      }

      async ForFolderName({ name, parentFolder }) {
            let folderCount = await this.repository.CountByFolderName({ name, parentFolder });

            if (folderCount > 0) throw new AppError(FOLDER_FOUND, "Please Rename folder name", 404);
      }


      async ForFolderParent({ _id }) {

            if (!_id) return

            let folderCount = await this.repository.CountByFolder({ _id });

            if (folderCount <= 0) throw new AppError(FOLDER_NOT_FOUND, "No Parent folder found", 404);
      }



      async ForDocument({ _id }) {
            let documentCount = await this.documentRep.CountByDocument({ _id });

            if (documentCount <= 0) throw new AppError(FOLDER_NOT_FOUND, "No document found", 404);
      }

}



export default FolderExist;