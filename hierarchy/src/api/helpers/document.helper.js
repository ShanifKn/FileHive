import { BASE_URL } from "../../config/index.js";
import DocumentRepository from "../../database/repositories/document.repositories.js";
import AppError from "../../utils/appError.js";
import { VERSION_UPLOAD_FAIL } from "../constants/errorCodes.js";

class DocumentHelper {
  constructor() {
    this.repostory = new DocumentRepository();
  }

  async CreateDocument({ title, content, folder, userId }) {
    await this.repostory.CreateDocument({ title, content, folder, userId });

    return { message: "Created document details." };
  }

  async CreateVersion({ documentId, versionNumber, fileUrl, token }) {
    const response = await fetch(`${BASE_URL}/add-version`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ documentId, versionNumber, fileUrl }),
    });

    if (!response.ok) throw new AppError(VERSION_UPLOAD_FAIL, "Version update failed", 401);

    const data = await response.json();

    return data;
  }

  async GetAllVersions({ documentId, token }) {
    const response = await fetch(`${BASE_URL}/versions/${documentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    if (!response.ok) throw new AppError(VERSION_UPLOAD_FAIL, "Version Connection failed", 401);

    const data = await response.json();

    return data;
  }

  async DeleteDocumentFromVersions({ documentId, token }) {
    const response = await fetch(`${BASE_URL}/documents/${documentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    if (!response.ok) throw new AppError(VERSION_UPLOAD_FAIL, "Version Connection failed", 401);

    const data = await response.json();

    return data;
  }

  async DeleteDocument({ documentId }) {
    return await this.repostory.DeleteDocument({ documentId });
  }

  async UpdateDocument({ documentId, title, content }) {
    await this.repostory.UpdateDocumentById(documentId, {
      ...(title && { title }),
      ...(content && { content }),
    });

    return { message: " Updated document details." };
  }

  async GetDocumentDetail({ documentId }) {
    return await this.repostory.GetDocumentDetail({ documentId });
  }

  async countDocuments({ userId }) {
    const data = await this.repostory.countDocuments({ userId });

    return { totalDocuments: data };
  }

}

export default DocumentHelper;
