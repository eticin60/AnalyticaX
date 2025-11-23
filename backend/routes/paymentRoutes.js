const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { createPayment, verifyPayment } = require("../controllers/paymentController");

router.post("/create", protect, createPayment);
router.post("/verify", protect, verifyPayment);

module.exports = router;
