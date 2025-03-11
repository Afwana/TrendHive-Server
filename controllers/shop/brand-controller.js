const Brand = require("../../models/Brand");

const fetchAllBrands = async (req, res) => {
  try {
    const listOfBrands = await Brand.find({});
    res.status(200).json({
      success: true,
      data: listOfBrands,
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
  fetchAllBrands,
};
