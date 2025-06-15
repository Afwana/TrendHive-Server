const express = require("express");

const {
  addAddress,
  fetchAllMessages,
  getAdminInfo,
  deleteMessage,
  addSocialMediaLinks,
  getMediaLinks,
} = require("../../controllers/admin/footer-controller");

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/info", getAdminInfo);
router.post("/addLinks", addSocialMediaLinks);
router.get("/mediaLinks", getMediaLinks);
router.get("/get", fetchAllMessages);
router.delete("/delete/:id", deleteMessage);

module.exports = router;
