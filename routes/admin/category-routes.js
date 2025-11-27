const express = require("express");

const {
  addCategory,
  editCategory,
  deleteCategory,
  fetchAllCategories,
  getCategoryById,
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
  getSubCategoriesByCategoryId,
} = require("../../controllers/admin/category-controller");

const router = express.Router();

router.post("/add", addCategory);
router.get("/get", fetchAllCategories);

router.get("/:id", getCategoryById);
router.put("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/:id/subCategories", getSubCategoriesByCategoryId);

// router.post("/:categoryId/subcategories", addSubCategory);
// router.put("/:categoryId/subcategories/:subCategoryId", editSubCategory);
// router.delete("/:categoryId/subcategories/:subCategoryId", deleteSubCategory);

module.exports = router;
