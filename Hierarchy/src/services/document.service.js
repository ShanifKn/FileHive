import DocumentHelper from "../api/helpers/document.helper.js"

class DocumentService {

      constructor() {
            this.helper = new DocumentHelper()
      }


      async CreateDocument({ title, content, folder, userId }) {
            return await this.helper.CreateDocument({ title, content, folder, userId })
      }


}



export default DocumentService