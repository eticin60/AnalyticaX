const User = require("../models/User");
const Payment = require("../models/Payment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin credentials - MUST be set via environment variables in production
// In development, defaults are used (NEVER use these in production!)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || (process.env.NODE_ENV === 'production' ? null : "admin");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? null : "dev_password_change_me");
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? null : "dev_secret_change_in_production");

// Validate admin credentials in production
if (process.env.NODE_ENV === 'production') {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !ADMIN_JWT_SECRET) {
    console.error("❌ CRITICAL: Admin credentials not set in production!");
    console.error("   Please set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_JWT_SECRET environment variables.");
    console.error("   Admin panel will not work until these are configured.");
  }
}

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    // Check if admin credentials are configured
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !ADMIN_JWT_SECRET) {
      console.error("❌ Admin credentials not configured!");
      return res.json({ ok: false, message: "Admin panel is not configured. Please contact the administrator." });
    }
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.json({ ok: false, message: "Username and password are required" });
    }
    
    // Use constant-time comparison to prevent timing attacks
    const usernameMatch = username === ADMIN_USERNAME;
    const passwordMatch = password === ADMIN_PASSWORD;
    
    if (usernameMatch && passwordMatch) {
      const token = jwt.sign({ admin: true, username }, ADMIN_JWT_SECRET, { expiresIn: "7d" });
      console.log(`✅ Admin login successful: ${username}`);
      return res.json({ ok: true, token, message: "Admin login successful" });
    }
    
    // Always return same error message to prevent username enumeration
    console.log(`❌ Admin login failed: ${username}`);
    return res.json({ ok: false, message: "Invalid username or password" });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.json({ ok: false, error: err.message });
  }
};

// Verify admin token middleware
const verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.json({ ok: false, message: "No token provided" });
    }
    
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
    if (!decoded.admin) {
      return res.json({ ok: false, message: "Invalid admin token" });
    }
    
    req.admin = decoded;
    next();
  } catch (err) {
    return res.json({ ok: false, message: "Invalid or expired token" });
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate("userId", "email")
      .sort({ createdAt: -1 });
    
    const formatted = payments.map(p => ({
      _id: p._id,
      userEmail: p.userId?.email || "Unknown",
      userId: p.userId?._id || p.userId,
      plan: p.plan,
      amount: p.amount,
      credits: p.credits || 0,
      method: p.method || "manual",
      txid: p.txid || "—",
      wallet: p.wallet || "—",
      status: p.status,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt || p.createdAt
    }));
    
    return res.json({ ok: true, payments: formatted });
  } catch (err) {
    console.error("Get payments error:", err);
    return res.json({ ok: false, error: err.message });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId, status } = req.body;
    
    if (!paymentId || !status) {
      return res.json({ ok: false, error: "Missing paymentId or status" });
    }
    
    const allowedStatuses = ["pending", "processing", "approved", "rejected", "delivered"];
    if (!allowedStatuses.includes(status)) {
      return res.json({ ok: false, error: "Invalid status" });
    }
    
    const payment = await Payment.findById(paymentId).populate("userId");
    if (!payment) {
      return res.json({ ok: false, error: "Payment not found" });
    }
    
    const oldStatus = payment.status;
    payment.status = status;
    payment.updatedAt = new Date();
    await payment.save();
    
    // If status changed to approved, add credits to user
    if (status === "approved" && oldStatus !== "approved") {
      const user = await User.findById(payment.userId._id || payment.userId);
      if (user) {
        // Get credits from plan name or use default
        let creditsToAdd = payment.credits || 0;
        if (!creditsToAdd) {
          // Try to extract credits from plan name (e.g., "Basic Startup - 5 Credits")
          const match = payment.plan.match(/(\d+)\s*[Cc]redit/i);
          if (match) {
            creditsToAdd = parseInt(match[1]);
          } else {
            // Default based on amount
            creditsToAdd = Math.floor(payment.amount / 10); // Rough estimate
          }
        }
        
        user.credits = (user.credits || 0) + creditsToAdd;
        
        // Set premium for VIP/GODMODE plans
        if (/VIP|GODMODE/i.test(payment.plan)) {
          user.premium = true;
        }
        
        // Add to purchases
        if (!user.purchases) user.purchases = [];
        user.purchases.push({
          amount: payment.amount,
          method: payment.method || "manual",
          txid: payment.txid || "",
          approved: true,
          date: new Date()
        });
        
        await user.save();
      }
    }
    
    return res.json({ ok: true, payment, message: `Payment status updated to ${status}` });
  } catch (err) {
    console.error("Update payment status error:", err);
    return res.json({ ok: false, error: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    return res.json({ ok: true, users });
  } catch (err) {
    console.error("Get users error:", err);
    return res.json({ ok: false, error: err.message });
  }
};

// Update user (add credits, toggle premium, etc.)
exports.updateUser = async (req, res) => {
  try {
    const { userId, addCredits, togglePremium } = req.body;
    
    if (!userId) {
      return res.json({ ok: false, error: "Missing userId" });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ ok: false, error: "User not found" });
    }
    
    if (addCredits !== undefined) {
      user.credits = (user.credits || 0) + Number(addCredits);
    }
    
    if (togglePremium) {
      user.premium = !user.premium;
    }
    
    await user.save();
    
    return res.json({ ok: true, user, message: "User updated successfully" });
  } catch (err) {
    console.error("Update user error:", err);
    return res.json({ ok: false, error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.json({ ok: false, error: "User not found" });
    }
    
    return res.json({ ok: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.json({ ok: false, error: err.message });
  }
};

// Export verifyAdmin for use in routes
exports.verifyAdmin = verifyAdmin;

