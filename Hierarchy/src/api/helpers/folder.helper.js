import DocumentRepository from "../../database/repositories/document.repositories.js";
import FolderRepository from "../../database/repositories/folder.repositories.js";

class FolderHelper {
  constructor() {
    this.repository = new FolderRepository();
    this.documentRep = new DocumentRepository();
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
    return await this.repository.GetUserFolder({ userId });
  }


  async GetSearchQuery({ search }) {

    // Build search query
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Find documents and populate folder
    const documents = await this.documentRep.DocumentSearchQuery( query )


    const results = await Promise.all(
      documents.map(async (doc) => {
        let folderPath = "";
        let currentFolder = doc.folder;

        while (currentFolder) {
          folderPath = currentFolder.name + (folderPath ? "/" + folderPath : "");
          currentFolder = currentFolder.parentFolder
            ? await Folder.findById(currentFolder.parentFolder)
            : null;
        }

        return {
          id: doc._id,
          title: doc.title,
          folderPath: folderPath || "Root",
        };
      })
    );


    return results;

  }
}

export default FolderHelper;
