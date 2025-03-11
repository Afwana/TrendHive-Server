const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProfileRouter = require("./routes/admin/admin-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminCategoryRouter = require("./routes/admin/category-routes");
const adminBrandRouter = require("./routes/admin/brand-routes");
const adminFooterRouter = require("./routes/admin/footer-routes");
const adminReviewRouter = require("./routes/admin/reviews-routes");
const adminReturnRouter = require("./routes/admin/return-routes");
const shopProfileRouter = require("./routes/shop/user-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopCategoryRouter = require("./routes/shop/category-routes");
const shopBrandRouter = require("./routes/shop/brand-routes");
const shopFooterRouter = require("./routes/shop/footer-routes");
const shopReturnRouter = require("./routes/shop/return-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// create a database connection -> u can also
// create a separate file for this and then import that file here

mongoose
  .connect("mongodb+srv://afwanakp:uniqueStore2024@cluster0.3bslv.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

app.use("/api/admin", adminProfileRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/category", adminCategoryRouter);
app.use("/api/admin/brand", adminBrandRouter);
app.use("/api/admin/footer", adminFooterRouter);
app.use("/api/admin/review", adminReviewRouter);
app.use("/api/admin/return", adminReturnRouter);

app.use("/api/shop", shopProfileRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/category", shopCategoryRouter);
app.use("/api/shop/brand", shopBrandRouter);
app.use("/api/shop/footer", shopFooterRouter);
app.use("/api/shop/return", shopReturnRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
