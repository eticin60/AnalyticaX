const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { createPayment, verifyPayment, getPaymentByTxid } = require("../controllers/paymentController");

router.post("/create", protect, createPayment);
router.post("/verify", protect, verifyPayment);
router.get("/txid/:txid", protect, getPaymentByTxid);

module.exports = router;
