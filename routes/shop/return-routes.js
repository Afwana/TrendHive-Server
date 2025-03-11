const express = require("express");
const { returnOrder } = require("../../controllers/shop/return-controller");

const router = express.Router();

router.post("/request", returnOrder);

module.exports = router;
