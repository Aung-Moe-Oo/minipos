const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: [String] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
