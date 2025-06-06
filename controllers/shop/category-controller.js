const Category = require("../../models/Category");

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

module.exports = {
  fetchAllCategories,
};
