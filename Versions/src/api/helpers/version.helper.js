import VersionRepository from "../../database/repositories/version.repositories.js";


class VersionHelper {
  constructor() {
    this.repository = new VersionRepository();
  }

  async CreateVersion({ documentId, versionNumber, fileUrl }) {
    return await this.repository.CreateVersion({ documentId, versionNumber, fileUrl })
  }

}

export default VersionHelper;
