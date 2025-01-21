import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
    content: { type: String },
    repository: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
      required: true,
    },
  },
  { timestamps: true }
);

const File = mongoose.model(File,fileSchema)
export default File;
