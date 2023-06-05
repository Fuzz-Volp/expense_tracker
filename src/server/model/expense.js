import { model, Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    date: { type: Date, default: Date.now, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
    amount: { type: Number, require: true, default: 0.0 },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Expense", expenseSchema);
