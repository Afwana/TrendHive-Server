const express = require("express");

const {
  getAdminInfo,
  addMessages,
  getUserMessage,
  getSocialMediaLinks,
} = require("../../controllers/shop/footer-controller");

const router = express.Router();

router.get("/get", getAdminInfo);
router.post("/add", addMessages);
router.get("/get/:userId", getUserMessage);
router.get("/getMediaLinks", getSocialMediaLinks);

module.exports = router;
