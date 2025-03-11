const express = require("express");
const {
  updateUserProfile,
  updateUserPassword,
} = require("../../controllers/shop/user-controller");

const router = express.Router();

router.put("/profile", updateUserProfile);
router.put("/password", updateUserPassword);

module.exports = router;
