const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      thumbnail,
      images,
      title,
      description,
      category,
      subCategories,
      brand,
      size,
      colours,
      quality,
      price,
      salePrice,
      totalStock,
      averageReview,
      relativeProducts = [],
    } = req.body;

    const subCategoriesArray =
      typeof subCategories === "string"
        ? subCategories.split(",").map((cat) => cat.trim())
        : Array.isArray(subCategories)
        ? subCategories
        : [];

    let relativeProductsArray = [];
    if (typeof relativeProducts === "string") {
      try {
        relativeProductsArray = JSON.parse(relativeProducts);
      } catch (error) {
        relativeProductsArray = [];
      }
    } else if (Array.isArray(relativeProducts)) {
      relativeProductsArray = relativeProducts;
    }

    const newlyCreatedProduct = new Product({
      thumbnail,
      images,
      title,
      description,
      category,
      subCategories: subCategoriesArray,
      brand,
      size,
      quality,
      colours,
      price,
      salePrice: salePrice || price,
      totalStock: totalStock || 0,
      averageReview: averageReview || 0,
      relativeProducts: relativeProductsArray,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured while adding product",
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  console.log(req);

  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database not connected");
    }

    const listOfProducts = await Product.find({});
    console.log(`Fetched ${listOfProducts.length} products`);
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching products",
      error: e.message,
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      thumbnail,
      images,
      title,
      description,
      category,
      subCategories,
      brand,
      price,
      size,
      colours,
      quality,
      salePrice,
      totalStock,
      averageReview,
      relativeProducts,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.size = size || findProduct.size;
    findProduct.quality = quality || findProduct.quality;
    findProduct.colours = colours || findProduct.colours;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.thumbnail = thumbnail || findProduct.thumbnail;
    findProduct.images = images || findProduct.images;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    // Update subCategories
    if (subCategories !== undefined) {
      findProduct.subCategories =
        typeof subCategories === "string"
          ? subCategories.split(",").map((sub) => sub.trim())
          : Array.isArray(subCategories)
          ? subCategories
          : [];
    }

    // Update relativeProducts
    if (relativeProducts !== undefined) {
      let relativeProductsArray = [];
      if (typeof relativeProducts === "string") {
        try {
          relativeProductsArray = JSON.parse(relativeProducts);
        } catch (e) {
          relativeProductsArray = [];
        }
      } else if (Array.isArray(relativeProducts)) {
        relativeProductsArray = relativeProducts;
      }
      findProduct.relativeProducts = relativeProductsArray;
    }

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching product",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
  getProductById,
};
