const express = require("express");
const router = express.Router();
const { sendOTPEmail } = require("../utils/emailService");
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

// Test Gemini API key endpoint
router.get("/test-gemini-key", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.json({
        ok: false,
        error: "GEMINI_API_KEY is not set in environment variables",
        details: "Please add GEMINI_API_KEY to Railway environment variables"
      });
    }
    
    // Check format
    if (!apiKey.startsWith("AIza")) {
      return res.json({
        ok: false,
        error: "GEMINI_API_KEY format is invalid",
        details: `API key should start with "AIza". Current key starts with: ${apiKey.substring(0, 4)}`,
        keyPreview: apiKey.substring(0, 10) + "..."
      });
    }
    
    // Try to initialize and make a test call
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      // Make a simple test request
      const result = await model.generateContent("Say 'OK' if you can read this.");
      const response = result.response.text();
      
      return res.json({
        ok: true,
        message: "Gemini API key is valid and working!",
        details: {
          keyExists: true,
          keyFormat: "Valid (starts with AIza)",
          keyLength: apiKey.length,
          keyPreview: apiKey.substring(0, 10) + "...",
          testResponse: response.substring(0, 50),
          model: "gemini-2.0-flash"
        }
      });
    } catch (geminiError) {
      console.error("Gemini API test error:", geminiError);
      
      const errorMessage = geminiError.message || "";
      const errorDetails = geminiError.error || {};
      
      if (
        errorMessage.includes("API key") ||
        errorMessage.includes("API_KEY") ||
        errorMessage.includes("API key not valid") ||
        errorMessage.includes("API_KEY_INVALID") ||
        errorDetails.reason === "API_KEY_INVALID" ||
        geminiError.status === 400
      ) {
        return res.json({
          ok: false,
          error: "GEMINI_API_KEY is invalid or expired",
          details: "The API key exists but is not valid. Please check:",
          checks: [
            "1. Verify the API key in Google AI Studio: https://aistudio.google.com/apikey",
            "2. Ensure the API key is active and not revoked",
            "3. Check if the API key has the correct permissions",
            "4. Make sure you're using the correct project's API key"
          ],
          errorMessage: errorMessage,
          keyPreview: apiKey.substring(0, 10) + "..."
        });
      }
      
      return res.json({
        ok: false,
        error: "Gemini API test failed",
        details: errorMessage,
        keyPreview: apiKey.substring(0, 10) + "..."
      });
    }
  } catch (err) {
    console.error("Test Gemini key error:", err);
    return res.json({ ok: false, error: err.message });
  }
});

module.exports = router;

