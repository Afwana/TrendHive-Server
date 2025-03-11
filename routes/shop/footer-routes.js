const express = require("express");

const {
  getAdminInfo,
  addMessages,
  getUserMessage,
} = require("../../controllers/shop/footer.controller");

const router = express.Router();

router.get("/get", getAdminInfo);
router.post("/add", addMessages);
router.get("/get/:userId", getUserMessage);

module.exports = router;
