import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 4.0 },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
