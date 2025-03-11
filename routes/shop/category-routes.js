const express = require("express");
const {
  fetchAllCategories,
} = require("../../controllers/shop/category-controller");

const router = express.Router();

router.get("/get", fetchAllCategories);

module.exports = router;
