import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    analysis: {
      type: Object,
    },
  },
  { timestamps: true }
);

// const Contract = mongoose.model("Contract", contractSchema);
const Contract = mongoose.models.Contract || mongoose.model("Contract", contractSchema);

export default Contract;
