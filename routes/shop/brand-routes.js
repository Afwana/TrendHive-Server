const express = require("express");
const { fetchAllBrands } = require("../../controllers/shop/brand-controller");

const router = express.Router();

router.get("/get", fetchAllBrands);

module.exports = router;
