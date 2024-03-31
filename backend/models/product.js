import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String },
    category: { type: Array },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
