import FolderRepository from "../../database/repositories/folder.repositories.js";

class FolderHelper {
  constructor() {
    this.repository = new FolderRepository();
  }

  async CreateFolder({ name, parentFolder, userId }) {

    await this.repository.CreateFolder({ name, parentFolder, userId });

    return { message: "Folder created" };
  }

  async UpdateFolder({ _id, name }) {

    await this.repository.UpdateFolder({ _id, name });

    return { message: "Folder updated" };
  }


  async GetUserFolder({ userId }) {
    return await this.repository.GetUserFolder({ userId })
  }
}

export default FolderHelper;
