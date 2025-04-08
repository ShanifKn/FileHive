import { Version } from "../models/version.model.js"


class VersionRepository {



      async CreateVersion({ documentId, versionNumber, fileUrl }) {
            return await Version.create({
                  id: documentId,
                  version: versionNumber,
                  fileUrl
            })
      }

}


export default VersionRepository