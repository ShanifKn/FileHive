import { Document } from "../models/document.model.js";

class DocumentRepository {
  async CreateDocument({ title, content, folder, userId }) {
    return await Document.create({
      title,
      content,
      folder,
      createdBy: userId,
    });
  }

  async CountByDocument({ _id }) {
    return await Document.countDocuments({
      _id,
    });
  }

  async UpdateDocumentById(documentId, updateFields) {
    return await Document.findByIdAndUpdate(documentId, { $set: updateFields }, { new: true });
  }

  async GetDocumentDetail({ documentId }) {
    return await Document.findOne({ _id: documentId }).select(" -__v ");
  }

  async DocumentSearchQuery(query) {
    return await Document.find(query).populate("folder");
  }

  async countDocuments({ userId }) {
    return await Document.countDocuments({ createdBy: userId });
  }

  async GetDocumentDetails({ folderId, userId }) {
    return await Document.find({ folder: folderId, createdBy: userId }).select("_id title content").lean();
  }

  async DeleteDocument({ documentId }) {
    return await Document.deleteOne({ _id: documentId })
  }
  

}

export default DocumentRepository;
