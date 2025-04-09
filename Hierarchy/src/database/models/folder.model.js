import mongoose, { Schema } from "mongoose";

const FolderSchema = new mongoose.Schema(
      {
            name: { type: String, required: true },

            parentFolder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },

            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      },
      { timestamps: true }
);

export const Folder = mongoose.model("folder", FolderSchema);
