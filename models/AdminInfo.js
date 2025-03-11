const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema(
  {
    address: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminInfo", InfoSchema);
