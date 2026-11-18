const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");

// orders with these statuses are not counted as sales/revenue
const EXCLUDED_STATUSES = [
  /^cancelled$/i,
  /^canceled$/i,
  /^rejected$/i,
  /^returned$/i,
];

const getDashboardStats = async (req, res) => {
  try {
    const [salesAgg, totalUsers, totalProducts] = await Promise.all([
      Order.aggregate([
        { $match: { orderStatus: { $not: { $in: EXCLUDED_STATUSES } } } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: { $ifNull: ["$totalAmount", 0] } },
            totalSales: { $sum: 1 },
          },
        },
      ]),
      User.countDocuments({ role: "user" }),
      Product.countDocuments({}),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: salesAgg[0]?.totalRevenue || 0,
        totalSales: salesAgg[0]?.totalSales || 0,
        totalUsers,
        totalProducts,
      },
    });
  } catch (e) {
    console.error("STATS ERROR:", e);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
};

module.exports = { getDashboardStats };
