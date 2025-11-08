const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const CategorySchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    subCategories: [SubCategorySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
