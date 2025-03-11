const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
