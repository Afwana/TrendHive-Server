const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const {
      category = [],
      brand = [],
      size = [],
      colours = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    let filters = {};

    if (category && category.length) {
      const categoryArray = Array.isArray(category)
        ? category
        : category.split(",");
      filters.category = { $in: categoryArray };
    }

    if (brand.length) {
      const brandArray = Array.isArray(brand) ? brand : brand.split(",");
      filters.brand = { $in: brandArray };
    }

    if (size.length) {
      const sizeArray = Array.isArray(size) ? size : size.split(",");
      filters.size = { $in: sizeArray.map((s) => new RegExp(s, "i")) };
    }

    if (colours.length) {
      const coloursArray = Array.isArray(colours)
        ? colours
        : colours.split(",");
      filters.colours = { $in: coloursArray.map((c) => new RegExp(c, "i")) };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "quality-lowtohigh":
        sort.quality = 1;

        break;
      case "quality-hightolow":
        sort.quality = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
