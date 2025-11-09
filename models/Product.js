const mongoose = require("mongoose");

const RelativeProductSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    images: [String],
    thumbnail: String,
    title: String,
    description: String,
    category: String,
    subCategories: [String],
    size: String,
    colours: String,
    quality: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    relativeProducts: [RelativeProductSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
