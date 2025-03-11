const Category = require("../../models/Category");

const addCategory = async (req, res) => {
  try {
    const { image, title } = req.body;

    const newCategory = new Category({
      image,
      title,
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
      message: "Error occured",
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
      message: "Error occured",
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title } = req.body;

    let findCategory = await Category.findById(id);
    if (!findCategory)
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });

    findCategory.image = image || findCategory.image;
    findCategory.title = title || findCategory.title;

    await findCategory.save();
    res.status(200).json({
      success: true,
      data: findCategory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
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
      message: "Error occured",
    });
  }
};

module.exports = {
  addCategory,
  fetchAllCategories,
  editCategory,
  deleteCategory,
};
