const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    UserId: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserMessage", MessageSchema);
