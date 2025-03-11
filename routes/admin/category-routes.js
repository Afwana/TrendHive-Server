const express = require("express");

const {
  addCategory,
  editCategory,
  deleteCategory,
  fetchAllCategories,
} = require("../../controllers/admin/category-controller");

const router = express.Router();

router.post("/add", addCategory);
router.put("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/get", fetchAllCategories);

module.exports = router;
