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

    // Get user info for meta data
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ ok: false, error: "User not found." });
    }

    // Extract network from method (e.g., "TRC20-USDT" -> "TRC20")
    const network = method ? method.split("-")[0] : "TRC20";
    
    // Get payment address from method
    const PAYMENT_ADDRESSES = {
      "TRC20-USDT": "TQDwWFmC2fMCDzLmrndc2bsiB7vK78DE33",
      "ERC20-USDT": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "BEP20-USDT": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "USDC-ERC20": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "BTC": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    };
    const deposit_address = PAYMENT_ADDRESSES[method] || null;

    // Get IP and user agent
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip || "unknown";
    const user_agent = req.headers["user-agent"] || "unknown";
    const device_fp = req.headers["x-device-fingerprint"] || null;

    // Check if payment already exists with this TXID (case-insensitive)
    const existing = await Payment.findOne({ 
      txid: txid.toLowerCase().trim(), 
      userId 
    });
    
    if (existing && existing.status === "approved") {
      return res.json({ ok: false, error: "This transaction has already been verified and approved." });
    }

    // Create or update payment with PENDING status (admin must approve)
    let payment = await Payment.findOne({ 
      txid: txid.toLowerCase().trim(), 
      userId 
    });
    
    if (!payment) {
      payment = await Payment.create({
        userId,
        plan: planName,
        product: `${credits} Credits - ${planName}`, // e.g., "5 Credits - Basic Startup"
        amount: Number(amount),
        credits: Number(credits) || 0,
        status: "pending", // Admin must approve
        txid: txid.toLowerCase().trim(),
        method: method || "manual",
        network: network,
        wallet: wallet || null,
        user_address: wallet || null,
        deposit_address: deposit_address,
        meta: {
          ip: ip,
          user_agent: user_agent,
          device_fp: device_fp,
          geo: null // Can be added later with geoip
        },
        date: new Date(),
        updatedAt: new Date()
      });
      
      console.log(`✅ Payment created: TXID=${txid.substring(0, 16)}..., User=${user.email}, Amount=$${amount}, Credits=${credits}, Status=pending`);
    } else {
      // Update existing payment
      payment.status = "pending"; // Keep as pending until admin approves
      payment.credits = Number(credits) || 0;
      payment.amount = Number(amount);
      payment.plan = planName;
      payment.product = `${credits} Credits - ${planName}`;
      if (wallet) {
        payment.wallet = wallet;
        payment.user_address = wallet;
      }
      if (deposit_address) payment.deposit_address = deposit_address;
      payment.network = network;
      payment.method = method || "manual";
      payment.updatedAt = new Date();
      payment.meta = {
        ip: ip,
        user_agent: user_agent,
        device_fp: device_fp,
        geo: payment.meta?.geo || null
      };
      await payment.save();
      
      console.log(`🔄 Payment updated: TXID=${txid.substring(0, 16)}..., Status=pending`);
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
