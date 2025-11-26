const { Resend } = require("@resend/node");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOTPEmail(email, otp) {
  try {
    // Eğer RESEND_API_KEY yoksa, sadece console'a yaz (development için)
    if (!process.env.RESEND_API_KEY) {
      console.log(`📧 OTP Email (not sent - no API key): ${email} - Code: ${otp}`);
      return { success: true, message: "OTP logged (no email service configured)" };
    }

    const { data, error } = await resend.emails.send({
      from: "AnalyticaX <noreply@analyticax.com.tr>", // Domain'i verify etmen gerekecek
      to: email,
      subject: "AnalyticaX - OTP Verification Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background: #020617; color: #fff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #0b1020; border-radius: 12px; padding: 30px; border: 1px solid rgba(148,163,184,.35); }
            .logo { text-align: center; margin-bottom: 30px; }
            h1 { color: #00E5FF; text-align: center; }
            .otp-box { background: rgba(0,229,255,.1); border: 2px solid #00E5FF; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }
            .otp-code { font-size: 32px; font-weight: bold; color: #00E5FF; letter-spacing: 8px; }
            .warning { color: #FF4DFF; font-size: 12px; text-align: center; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #A0AEC0; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <h1>🔐 AnalyticaX</h1>
            </div>
            <h1>OTP Verification Code</h1>
            <p style="text-align: center; color: #A0AEC0;">Your verification code is:</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p style="text-align: center; color: #A0AEC0;">This code will expire in 5 minutes.</p>
            <p class="warning">⚠️ If you didn't request this code, please ignore this email.</p>
            <div class="footer">
              <p>© 2025 AnalyticaX. All rights reserved.</p>
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Email send error:", error);
      return { success: false, error: error.message };
    }

    console.log(`✅ OTP email sent to ${email}`);
    return { success: true, data };
  } catch (err) {
    console.error("❌ Email service error:", err);
    // Hata olsa bile OTP'yi console'a yaz (fallback)
    console.log(`📧 OTP (fallback): ${email} - Code: ${otp}`);
    return { success: false, error: err.message };
  }
}

module.exports = { sendOTPEmail };

