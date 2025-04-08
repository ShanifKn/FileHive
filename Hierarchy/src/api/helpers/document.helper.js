import DocumentRepository from "../../database/repositories/document.repositories.js"

class DocumentHelper {

      constructor() {
            this.repostory = new DocumentRepository()
      }


      async CreateDocument({ title, content, folder, userId }) {
            await this.repostory.CreateDocument({ title, content, folder, userId })

            return { message: "Created document details." }
      }
}

export default DocumentHelper