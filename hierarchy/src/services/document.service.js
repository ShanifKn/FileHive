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

  async GetAllVersions({ documentId, token }) {
    const { data } = await this.helper.GetAllVersions({ documentId, token });

    const mappedVersions = data.map((item) => ({
      id: item.id,
      version: item.version,
      fileUrl: item.fileUrl,
      uploadedAt: item.createdAt,
    }));

    return mappedVersions;
  }

  async GetDocumentDetails({ documentId, token }) {
    const document = await this.helper.GetDocumentDetail({ documentId });

    const { data: versions } = await this.helper.GetAllVersions({ documentId, token });

    const mappedVersions = versions.map((v) => ({
      version: v.version,
      fileUrl: v.fileUrl,
      uploadedAt: v.createdAt,
    }));

    return {
      id: document._id,
      title: document.title,
      folder: document.folder,
      createdAt: document.createdAt,
      versions: mappedVersions,
    };
  }

  async DeleteDocumentAndVersions({ documentId, token }) {
    await this.helper.DeleteDocumentFromVersions({
      documentId,
      token,
    });

    return await this.helper.DeleteDocument({ documentId })
  }

  async FindDocumentByFolder({ folderId }) {
    return await this.helper.FindDocumentByFolder({ folderId })
  }

  async UpdateDocument({ documentId, title, content }) {
    return await this.helper.UpdateDocument({ documentId, title, content });
  }


  async countDocuments({ userId }) {
    return await this.helper.countDocuments({ userId })
  }
}

export default DocumentService;
