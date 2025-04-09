import mongoose, { Schema } from "mongoose";

const VersionSchema = new mongoose.Schema({

  id: { type: mongoose.Schema.Types.ObjectId, required: true },

  version: { type: String, required: true, unique: true },

  fileUrl: { type: String, required: true },

},
  { timestamps: true });


export const Version = mongoose.model("version", VersionSchema);
