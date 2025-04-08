import mongoose, { Schema } from "mongoose";

const DocumentSchema = new mongoose.Schema({

      title: { type: String, required: true },

      content: { type: String },

      folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: false },

      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

    }, { timestamps: true });
    
export const Document = mongoose.model("document", DocumentSchema);
