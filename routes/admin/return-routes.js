const express = require("express");
const {
  fetchAllReturns,
  deleteReturnRequest,
  updateReturnStatus,
} = require("../../controllers/admin/return-controller");

const router = express.Router();

router.get("/get", fetchAllReturns);
router.put("/update/:id", updateReturnStatus);
router.delete("/delete/:id", deleteReturnRequest);

module.exports = router;
