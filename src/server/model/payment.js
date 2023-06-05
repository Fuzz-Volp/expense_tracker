import { model, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["PersonalCC", "Cash", "Other"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Payment", paymentSchema);
