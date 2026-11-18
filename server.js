require("dotenv").config();
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
const adminStatsRouter = require("./routes/admin/stats-routes");
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

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not set! Add it in Render > Environment.");
}

mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Connection Failed:", error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://trendhive-resell.vercel.app",
      "https://trendhive-resell-admin.vercel.app",
      ...(process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(",") : []),
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

app.set("trust proxy", 1); // needed behind Render's proxy for secure cookies

app.get("/", (req, res) =>
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1 ? "connected" : "not connected",
  }),
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
app.use("/api/admin/stats", adminStatsRouter);

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
