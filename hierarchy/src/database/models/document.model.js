import mongoose, { Schema } from "mongoose";

const DocumentSchema = new mongoose.Schema({

      title: { type: String, required: true },

      content: { type: String },

      folder: { type: mongoose.Schema.Types.ObjectId, ref: 'folder', required: false },

      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }

    }, { timestamps: true });
    
export const Document = mongoose.model("document", DocumentSchema);
