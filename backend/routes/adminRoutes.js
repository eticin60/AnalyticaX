const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getPayments,
  updatePaymentStatus,
  getUsers,
  updateUser,
  deleteUser,
  verifyAdmin
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.get("/payments", verifyAdmin, getPayments);
router.post("/payment/update", verifyAdmin, updatePaymentStatus);
router.get("/users", verifyAdmin, getUsers);
router.post("/user/update", verifyAdmin, updateUser);
router.delete("/user/delete/:userId", verifyAdmin, deleteUser);

module.exports = router;

