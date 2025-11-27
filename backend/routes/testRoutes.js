const express = require("express");
const router = express.Router();
const { sendOTPEmail } = require("../utils/emailService");

// Test email endpoint (for debugging)
router.post("/test-email", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.json({ ok: false, error: "Email is required" });
    }
    
    const testOtp = "123456";
    console.log(`🧪 Testing email send to ${email}...`);
    
    const result = await sendOTPEmail(email, testOtp);
    
    return res.json({
      ok: result.success,
      message: result.success 
        ? "Test email sent successfully! Check your inbox." 
        : "Test email failed. Check Railway logs for details.",
      result,
      smtpConfig: {
        hasHost: !!process.env.SMTP_HOST,
        hasUser: !!process.env.SMTP_USER,
        hasPass: !!process.env.SMTP_PASS,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === "true",
        host: process.env.SMTP_HOST || "NOT SET",
        user: process.env.SMTP_USER || "NOT SET"
      }
    });
  } catch (err) {
    console.error("Test email error:", err);
    return res.json({ ok: false, error: err.message });
  }
});

module.exports = router;

