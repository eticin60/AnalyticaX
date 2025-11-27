const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, required: true }, 
  txid: { type: String, default: null },
  amount: { type: Number, required: true },
  credits: { type: Number, default: 0 },
  method: { type: String, default: "manual" },
  wallet: { type: String, default: null },
  status: { type: String, default: "pending", enum: ["pending", "processing", "approved", "rejected", "delivered"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
