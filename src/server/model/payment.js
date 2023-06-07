import { model, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payement = model("Payment", paymentSchema);

export default Payement;
