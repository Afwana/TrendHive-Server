const Category = require("../../models/Category");

const addCategory = async (req, res) => {
  try {
    const { image, title, subCategories = [] } = req.body;

    // Validate required fields
    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: "Image and title are required",
      });
    }

    const newCategory = new Category({
      image,
      title,
      subCategories,
    });

    await newCategory.save();
    res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured while adding category",
    });
  }
};

const fetchAllCategories = async (req, res) => {
  try {
    const listOfCategories = await Category.find({});
    res.status(200).json({
      success: true,
      data: listOfCategories,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured while fetching categories",
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, subCategories } = req.body;

    let findCategory = await Category.findById(id);
    if (!findCategory)
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });

    if (image !== undefined) findCategory.image = image;
    if (title !== undefined) findCategory.title = title;
    if (subCategories !== undefined) findCategory.subCategories = subCategories;

    await findCategory.save();
    res.status(200).json({
      success: true,
      data: findCategory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured while editing category",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category)
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured while deleting category",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured while fetching category",
    });
  }
};

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: category.subCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching subcategories",
    });
  }
};

const editSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategory } = req.params;
    const { title, image } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Find the subcategory by id
    const subCategories = category.subCategories.id(parseInt(subCategoryId));
    if (!subCategories) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    // Update subcategory fields
    if (title !== undefined) subCategories.title = title;
    if (image !== undefined) subCategories.image = image;

    await category.save();
    res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while editing subcategory",
    });
  }
};

const addSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { id, title, image } = req.body;

    // Validate required fields
    if (!id || !title || !image) {
      return res.status(400).json({
        success: false,
        message: "ID, title, and image are required for subcategory",
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if subcategory with same id already exists
    const existingSubCategory = category.subCategories.find(
      (sub) => sub.id === id
    );
    if (existingSubCategory) {
      return res.status(400).json({
        success: false,
        message: "Subcategory with this ID already exists",
      });
    }

    // Add new subcategory
    category.subCategories.push({ id, title, image });
    await category.save();

    res.status(201).json({
      success: true,
      data: category.subCategories[category.subCategories.length - 1],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding subcategory",
    });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Remove subcategory by id
    category.subCategories = category.subCategories.filter(
      (sub) => sub.id !== parseInt(subCategoryId)
    );

    await category.save();
    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting subcategory",
    });
  }
};

module.exports = {
  addCategory,
  fetchAllCategories,
  editCategory,
  deleteCategory,
  getSubCategoriesByCategoryId,
  getCategoryById,
  editSubCategory,
  addSubCategory,
  deleteSubCategory,
};
