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
    // Debug: SMTP ayarlarını kontrol et (şifreyi gösterme)
    const hasHost = !!process.env.SMTP_HOST;
    const hasUser = !!process.env.SMTP_USER;
    const hasPass = !!process.env.SMTP_PASS;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpSecure = process.env.SMTP_SECURE === "true";
    
    console.log(`📧 SMTP Config Check:`);
    console.log(`   - SMTP_HOST: ${hasHost ? process.env.SMTP_HOST : '❌ NOT SET'}`);
    console.log(`   - SMTP_PORT: ${smtpPort}`);
    console.log(`   - SMTP_SECURE: ${smtpSecure}`);
    console.log(`   - SMTP_USER: ${hasUser ? process.env.SMTP_USER : '❌ NOT SET'}`);
    console.log(`   - SMTP_PASS: ${hasPass ? '✅ SET' : '❌ NOT SET'}`);
    
    const transporter = createTransporter();

    // SMTP ayarları yoksa sadece console'a yaz
    if (!transporter) {
      console.log(`\n❌ OTP Email (not sent - no SMTP configured): ${email} - Code: ${otp}`);
      console.log(`💡 SMTP ayarlarını eklemek için Railway'a şu variables'ları ekle:`);
      console.log(`   - SMTP_HOST=mail.kurumsaleposta.com (veya mail.analyticax.com.tr)`);
      console.log(`   - SMTP_PORT=587 (veya 465)`);
      console.log(`   - SMTP_USER=support@analyticax.com.tr (tam email adresi)`);
      console.log(`   - SMTP_PASS=email_sifresi (email hesabının şifresi)`);
      console.log(`   - SMTP_SECURE=false (587 için) veya true (465 için)`);
      console.log(`\n🔑 OTP CODE FOR ${email}: ${otp}\n`);
      return { success: false, message: "OTP logged (no SMTP service configured)", otp: otp };
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

    // Test connection first
    console.log(`🔍 Testing SMTP connection...`);
    await transporter.verify();
    console.log(`✅ SMTP connection verified`);
    
    console.log(`📤 Sending OTP email to ${email}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully!`);
    console.log(`   - Message ID: ${info.messageId}`);
    console.log(`   - Response: ${info.response || 'N/A'}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Email send error:", err);
    console.error("   - Error code:", err.code);
    console.error("   - Error command:", err.command);
    console.error("   - Error response:", err.response);
    console.error("   - Full error:", JSON.stringify(err, null, 2));
    
    // Hata olsa bile OTP'yi console'a yaz (fallback)
    console.log(`\n🔑 OTP CODE FOR ${email} (fallback - email failed): ${otp}\n`);
    return { success: false, error: err.message, details: err.code || err.response };
  }
}

module.exports = { sendOTPEmail };
