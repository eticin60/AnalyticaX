const nodemailer = require("nodemailer");

// SMTP transporter oluştur
const createTransporter = () => {
  // Eğer SMTP ayarları varsa kullan, yoksa console'a yaz
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Bazı SMTP sunucuları için gerekli
      },
    });
  }
  return null;
};

async function sendOTPEmail(email, otp) {
  try {
    const transporter = createTransporter();

    // SMTP ayarları yoksa sadece console'a yaz
    if (!transporter) {
      console.log(`📧 OTP Email (not sent - no SMTP configured): ${email} - Code: ${otp}`);
      console.log(`💡 SMTP ayarlarını eklemek için Railway'a şu variables'ları ekle:`);
      console.log(`   - SMTP_HOST (örn: mail.analyticax.com.tr veya smtp.gmail.com)`);
      console.log(`   - SMTP_PORT (örn: 587 veya 465)`);
      console.log(`   - SMTP_USER (örn: support@analyticax.com.tr)`);
      console.log(`   - SMTP_PASS (email şifresi)`);
      console.log(`   - SMTP_SECURE (true veya false, 465 için true)`);
      return { success: true, message: "OTP logged (no SMTP service configured)" };
    }

    const mailOptions = {
      from: `"AnalyticaX" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "AnalyticaX - OTP Verification Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              background: #020617; 
              color: #fff; 
              padding: 20px; 
              margin: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #0b1020; 
              border-radius: 12px; 
              padding: 30px; 
              border: 1px solid rgba(148,163,184,.35); 
            }
            .logo { 
              text-align: center; 
              margin-bottom: 30px; 
            }
            h1 { 
              color: #00E5FF; 
              text-align: center; 
              margin-bottom: 10px;
            }
            .otp-box { 
              background: rgba(0,229,255,.1); 
              border: 2px solid #00E5FF; 
              border-radius: 8px; 
              padding: 20px; 
              text-align: center; 
              margin: 30px 0; 
            }
            .otp-code { 
              font-size: 32px; 
              font-weight: bold; 
              color: #00E5FF; 
              letter-spacing: 8px; 
              font-family: monospace;
            }
            .warning { 
              color: #FF4DFF; 
              font-size: 12px; 
              text-align: center; 
              margin-top: 20px; 
            }
            .footer { 
              text-align: center; 
              margin-top: 30px; 
              color: #A0AEC0; 
              font-size: 12px; 
            }
            p {
              color: #A0AEC0;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <h1>🔐 AnalyticaX</h1>
            </div>
            <h1>OTP Verification Code</h1>
            <p style="text-align: center;">Your verification code is:</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p style="text-align: center;">This code will expire in 5 minutes.</p>
            <p class="warning">⚠️ If you didn't request this code, please ignore this email.</p>
            <div class="footer">
              <p>© 2025 AnalyticaX. All rights reserved.</p>
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        AnalyticaX - OTP Verification Code
        
        Your verification code is: ${otp}
        
        This code will expire in 5 minutes.
        
        If you didn't request this code, please ignore this email.
        
        © 2025 AnalyticaX. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${email}`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Email send error:", err);
    // Hata olsa bile OTP'yi console'a yaz (fallback)
    console.log(`📧 OTP (fallback): ${email} - Code: ${otp}`);
    return { success: false, error: err.message };
  }
}

module.exports = { sendOTPEmail };
