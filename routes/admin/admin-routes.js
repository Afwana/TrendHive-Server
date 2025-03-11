const express = require("express");
const {
  updateAdminProfile,
  updateAdminPassword,
} = require("../../controllers/admin/admin-controller");

const router = express.Router();

router.put("/profile", updateAdminProfile);
router.put("/password", updateAdminPassword);

module.exports = router;
