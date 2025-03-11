const express = require("express");

const {
  addAddress,
  fetchAllMessages,
  getAdminInfo,
  deleteMessage,
} = require("../../controllers/admin/footer-controller");

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/info", getAdminInfo);
router.get("/get", fetchAllMessages);
router.delete("/delete/:id", deleteMessage);

module.exports = router;
