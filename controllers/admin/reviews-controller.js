const ProductReview = require("../../models/Review");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await ProductReview.find({});

    if (!reviews.length) {
      return res.status(404).json({
        success: false,
        message: "No reviews found!",
      });
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await ProductReview.findByIdAndDelete(id);

    if (!review)
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
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
  getAllReviews,
  deleteReview,
};
