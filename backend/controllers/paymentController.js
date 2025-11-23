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
    const { txid, planName, amount, credits, method } = req.body;

    if (!txid || !planName || !amount || !credits) {
      return res.json({ ok: false, error: "Missing verification fields." });
    }

    // Check if payment already exists with this TXID
    const existing = await Payment.findOne({ txid, userId });
    if (existing && existing.status === "approved") {
      return res.json({ ok: false, error: "This transaction has already been verified." });
    }

    // Create or update payment
    let payment = await Payment.findOne({ txid, userId });
    if (!payment) {
      payment = await Payment.create({
        userId,
        plan: planName,
        amount,
        status: "approved",
        txid,
        method: method || "manual"
      });
    } else {
      payment.status = "approved";
      await payment.save();
    }

    // Add credits to user
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ ok: false, error: "User not found" });
    }

    const numericCredits = Number(credits) || 0;
    user.credits = (user.credits || 0) + numericCredits;

    if (/VIP|GODMODE/i.test(planName)) {
      user.premium = true;
    }

    if (!user.purchases) user.purchases = [];
    user.purchases.push({
      amount,
      method: method || "manual",
      txid,
      approved: true,
      date: new Date()
    });

    await user.save();

    return res.json({
      ok: true,
      orderId: payment._id,
      credits: user.credits,
      premium: user.premium,
      message: "Payment verified successfully!"
    });
  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err);
    return res.json({ ok: false, error: "Verification failed." });
  }
};
