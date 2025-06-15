const mongoose = require("mongoose");

const SocialMediaLinks = new mongoose.Schema(
  {
    whatsapp: String,
    instagram: String,
    facebook: String,
    xtwitter: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SocialMediaLinks", SocialMediaLinks);
