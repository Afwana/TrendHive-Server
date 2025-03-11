const express = require("express");
const {
  getAllReviews,
  deleteReview,
} = require("../../controllers/admin/reviews-controller");

const router = express.Router();

router.get("/get", getAllReviews);
router.delete("/delete/:id", deleteReview);

module.exports = router;
