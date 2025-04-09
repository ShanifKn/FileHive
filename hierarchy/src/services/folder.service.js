import DocumentHelper from "../api/helpers/document.helper.js";
import FolderHelper from "../api/helpers/folder.helper.js";
import DocumentService from "./document.service.js";

class FolderService {
      constructor() {
            this.helper = new FolderHelper();
            this.documentService = new DocumentService()
      }

      async CreateFolder({ name, parentFolder, userId }) {
            return await this.helper.CreateFolder({ name, parentFolder, userId });
      }

      async UpdateFolder({ _id, name }) {
            return await this.helper.UpdateFolder({ _id, name });
      }

      async GetUserFolder({ userId }) {
            return await this.helper.GetUserFolder({ userId });
      }


      async GetSearchQuery({ search }) {
            return await this.helper.GetSearchQuery({ search })
      }


      async GetFolderDetails({ folderId, userId }) {
            return await this.helper.GetFolderDetails({ folderId, userId })
      }


      async GetFolder({ folderId }) {
            return await this.helper.GetFolderDetails({ folderId, userId })
      }


      async DeleteFolder({ folderId }) {


            return await this.helper.DeleteFolder({ folderId })
      }
}

export default FolderService;
