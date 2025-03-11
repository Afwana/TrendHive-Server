const express = require("express");
const {
  addBrand,
  editBrand,
  deleteBrand,
  fetchAllBrands,
} = require("../../controllers/admin/brand-controller");

const router = express.Router();

router.post("/add", addBrand);
router.put("/edit/:id", editBrand);
router.delete("/delete/:id", deleteBrand);
router.get("/get", fetchAllBrands);

module.exports = router;
