const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    image: String,
    title: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
