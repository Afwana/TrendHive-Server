const express = require("express");

const {
  addAddress,
  fetchAllMessages,
  getAdminInfo,
  deleteMessage,
  addSocialMediaLinks,
} = require("../../controllers/admin/footer-controller");

const router = express.Router();

router.post("/add", addAddress);
router.post("/mediaLinks", addSocialMediaLinks);
router.get("/get/info", getAdminInfo);
router.get("/get", fetchAllMessages);
router.delete("/delete/:id", deleteMessage);

module.exports = router;
