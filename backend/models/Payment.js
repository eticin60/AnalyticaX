const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  plan: { type: String, required: true }, 

  txid: { type: String, default: null },
  amount: { type: Number, required: true },

  status: { type: String, default: "pending" },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
