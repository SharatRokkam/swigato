import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      require: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String }, //pizza, burger, drinks...
  },
  {
    timestamps: true,
  }
);

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
