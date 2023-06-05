import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Food", "Entertainment", "Utilities", "Other"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
