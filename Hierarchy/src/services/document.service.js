import DocumentHelper from "../api/helpers/document.helper.js";

class DocumentService {
      constructor() {
            this.helper = new DocumentHelper();
      }

      async CreateDocument({ title, content, folder, userId }) {
            return await this.helper.CreateDocument({ title, content, folder, userId });
      }

      async UploadVersion({ documentId, versionNumber, fileUrl, token }) {
            const { data } = await this.helper.CreateVersion({ documentId, versionNumber, fileUrl, token });

            const datas = {
                  id: data.id,
                  version: data.version,
                  fileUrl: data.fileUrl,
                  uploadedAt: data.createdAt,
            };

            return datas;
      }
}

export default DocumentService;
