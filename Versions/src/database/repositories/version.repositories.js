import { Version } from "../models/version.model.js"


class VersionRepository {

      async CreateVersion({ documentId, finalVersion, fileUrl }) {
            return await Version.create({
                  id: documentId,
                  version: finalVersion,
                  fileUrl,
            })
      }


      async FindLastestVersion({ documentId }) {
            return await Version.find({ id: documentId })
      }

}


export default VersionRepository