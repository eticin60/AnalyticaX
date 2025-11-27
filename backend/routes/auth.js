const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOtp,
  resendOtp,
  me,
  changeEmail,
  changePassword,
  deleteAccount
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// Debug middleware
router.use((req, res, next) => {
  console.log(`🔍 Auth route: ${req.method} ${req.path}`);
  next();
});

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

router.get("/me", protect, me);
router.post("/change-email", protect, changeEmail);
router.post("/change-password", protect, changePassword);
router.delete("/delete-account", protect, deleteAccount);

module.exports = router;
