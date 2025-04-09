import { Document } from "../models/document.model.js";

class DocumentRepository {


      async CreateDocument({ title, content, folder, userId }) {
            return await Document.create({
                  title,
                  content,
                  folder,
                  createdBy: userId,
            })

      }


            async CountByDocument({ _id }) {
                  return await Document.countDocuments({
                        _id,
                  });
            }

}


export default DocumentRepository;