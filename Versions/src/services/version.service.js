import VersionHelper from "../api/helpers/version.helper.js";

class VersionService {
  constructor() {
    this.helper = new VersionHelper();
  }

  async CreateVersion({ documentId, versionNumber, fileUrl }) {
    return await this.helper.CreateVersion({ documentId, versionNumber, fileUrl });
  }

  async GetAllVersions({ documentId }) {
    return await this.helper.GetAllVersions({ documentId });
  }


  async DeleteDocumentAndVersions({documentId}){
      return await this.helper.DeleteDocumentAndVersions({documentId})
  }
}

export default VersionService;
