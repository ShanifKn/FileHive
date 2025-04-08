
import VersionHelper from "../api/helpers/version.helper.js"

class VersionService {

      constructor() {
            this.helper = new VersionHelper()
      }

      async CreateVersion({ documentId, versionNumber, fileUrl }) {
            return await this.repository.CreateVersion({ documentId, versionNumber, fileUrl })
      }


}


export default VersionService