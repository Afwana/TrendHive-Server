const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    images: [String],
    thumbnail: String,
    title: String,
    description: String,
    category: String,
    subCategory: [String],
    size: String,
    colours: String,
    quality: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    relativeProducts: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
