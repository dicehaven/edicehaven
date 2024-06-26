import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: { type: String, required: true, unique: true },
    payerId: { type: String, required: true },
    paymentId: { type: String, required: true },
    paymentSource: { type: String, required: true },
    status: { type: String },
    totalPaid: { type: Number },
    orderDetails: { type: Array, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
