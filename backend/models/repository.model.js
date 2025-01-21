import mongoose from 'mongoose'

const repositorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String },
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Repository = mongoose.model("Repository", repositorySchema);
export default Repository
