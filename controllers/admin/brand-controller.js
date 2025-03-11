const Brand = require("../../models/Brand");

const addBrand = async (req, res) => {
  try {
    const { image, title } = req.body;

    const newBrand = new Brand({
      image,
      title,
    });

    await newBrand.save();
    res.status(201).json({
      success: true,
      data: newBrand,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

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

const editBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title } = req.body;

    let findBrand = await Brand.findById(id);
    if (!findBrand)
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });

    findBrand.image = image || findBrand.image;
    findBrand.title = title || findBrand.title;

    await findBrand.save();
    res.status(200).json({
      success: true,
      data: findBrand,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);

    if (!brand)
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
      });

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully.",
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
  addBrand,
  fetchAllBrands,
  editBrand,
  deleteBrand,
};
