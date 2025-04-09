import VersionRepository from "../../database/repositories/version.repositories.js";

class VersionHelper {
  constructor() {
    this.repository = new VersionRepository();
  }

  async CreateVersion({ documentId, versionNumber, fileUrl }) {
    let finalVersion = versionNumber;

    // Get all versions for this document
    const existingVersions = await this.repository.FindLastestVersion({ documentId });

    // If the version already exists for this doc, we need to auto-increment
    const versionExists = existingVersions.find((v) => v.version === versionNumber);

    if (versionExists) {
      let [major, minor] = versionNumber.split(".").map(Number);

      // Try next minor versions until .9
      while (true) {
        if (minor < 9) {
          minor += 1;
        } else {
          // Reset minor, increment major
          major += 1;
          minor = 0;
        }

        finalVersion = `${major}.${minor}`;

        const conflict = existingVersions.find((v) => v.version === finalVersion);
        if (!conflict) break; // Found a unique version
      }
    }

    return await this.repository.CreateVersion({ documentId, finalVersion, fileUrl });
  }

  async GetAllVersions({ documentId }) {
    return await this.repository.FindLastestVersion({ documentId });
  }


  async DeleteDocumentAndVersions({ documentId }) {
    return await this.repository.DeleteDocumentAndVersions({ documentId })
  }
}

export default VersionHelper;
