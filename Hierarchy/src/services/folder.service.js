import FolderHelper from "../api/helpers/folder.helper.js";

class FolderService {
      constructor() {
            this.helper = new FolderHelper();
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
}

export default FolderService;
