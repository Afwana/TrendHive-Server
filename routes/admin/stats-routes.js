const express = require("express");
const {
  getDashboardStats,
} = require("../../controllers/admin/stats-controller");
const { authMiddleware } = require("../../controllers/auth/auth-controller");

const router = express.Router();

const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Admin access only" });
  }
  next();
};

router.get("/", authMiddleware, adminOnly, getDashboardStats);

module.exports = router;
