const Payment = require("../models/Payment");
const User = require("../models/User");

exports.createPayment = async (req, res) => {
  try {
    const userId = req.user._id;

    const { planName, amount, credits, method } = req.body;

    if (!planName || !amount || !credits || !method) {
      return res.json({ ok: false, error: "Missing payment fields." });
    }

    const payment = await Payment.create({
      userId,
      plan: planName,
      amount,
      status: "pending", 
      txid: null,
      method
    });

    return res.json({
      ok: true,
      orderId: payment._id,
      message: "Payment order created. Please complete payment and verify."
    });
  } catch (err) {
    console.error("CREATE PAYMENT ERROR:", err);
    return res.json({ ok: false, error: "Payment failed." });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { txid, planName, amount, credits, method, wallet } = req.body;

    if (!txid || !planName || !amount || !credits) {
      return res.json({ ok: false, error: "Missing verification fields." });
    }

    // Check if payment already exists with this TXID
    const existing = await Payment.findOne({ txid, userId });
    if (existing && existing.status === "approved") {
      return res.json({ ok: false, error: "This transaction has already been verified." });
    }

    // Create or update payment with PENDING status (admin must approve)
    let payment = await Payment.findOne({ txid, userId });
    if (!payment) {
      payment = await Payment.create({
        userId,
        plan: planName,
        amount,
        credits: Number(credits) || 0,
        status: "pending", // Changed to pending - admin must approve
        txid,
        method: method || "manual",
        wallet: wallet || null
      });
    } else {
      payment.status = "pending"; // Keep as pending until admin approves
      payment.credits = Number(credits) || 0;
      if (wallet) payment.wallet = wallet;
      await payment.save();
    }

    // DO NOT add credits yet - wait for admin approval
    // Return success but inform user that payment is pending admin approval
    return res.json({
      ok: true,
      orderId: payment._id,
      status: "pending",
      message: "Payment submitted successfully! Your transaction is pending admin approval. You will receive credits once approved."
    });
  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err);
    return res.json({ ok: false, error: "Verification failed." });
  }
};
