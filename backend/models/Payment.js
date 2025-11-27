const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, required: true }, 
  product: { type: String, default: null }, // e.g., "100K FLASH USDT" or plan name
  txid: { type: String, default: null, index: true }, // Index for faster lookups
  amount: { type: Number, required: true },
  credits: { type: Number, default: 0 },
  method: { type: String, default: "manual" },
  network: { type: String, default: "TRC20" }, // TRC20, ERC20, BEP20, BTC, etc.
  wallet: { type: String, default: null }, // User's wallet address
  user_address: { type: String, default: null }, // Same as wallet, for compatibility
  deposit_address: { type: String, default: null }, // Payment address used
  status: { type: String, default: "pending", enum: ["pending", "processing", "approved", "rejected", "delivered"] },
  meta: {
    ip: { type: String, default: null },
    user_agent: { type: String, default: null },
    device_fp: { type: String, default: null },
    geo: { type: String, default: null }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  date: { type: Date, default: Date.now } // For compatibility with PHP format
});

// Index for faster queries
PaymentSchema.index({ txid: 1 });
PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Payment", PaymentSchema);
