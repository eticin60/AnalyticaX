const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

let otpStore = {};
let loginAttempts = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function isProxy(ip) {
  try {
    const res = await axios.get(`http://ip-api.com/json/${ip}?fields=proxy`);
    return res.data.proxy === true;
  } catch {
    return false;
  }
}

function isBlocked(ip) {
  if (!loginAttempts[ip]) return false;
  const a = loginAttempts[ip];
  const now = Date.now();
  return a.count >= 5 && now - a.lastAttempt < 15 * 60 * 1000;
}

function recordFailedAttempt(ip) {
  const now = Date.now();
  if (!loginAttempts[ip]) loginAttempts[ip] = { count: 1, lastAttempt: now };
  else {
    loginAttempts[ip].count++;
    loginAttempts[ip].lastAttempt = now;
  }
}

exports.register = async (req, res) => {
  try {
    const { email, password, deviceId, deviceFingerprint } = req.body;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (await isProxy(ip))
      return res.json({ ok: false, message: "VPN / Proxy detected." });

    const ipUsed = await User.findOne({ ipAddress: ip });
    if (ipUsed)
      return res.json({ ok: false, message: "Multiple accounts not allowed." });

    const exists = await User.findOne({ email });
    if (exists)
      return res.json({ ok: false, message: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);

    const today = new Date().toISOString().split("T")[0];

    const newUser = await User.create({
      email,
      password: hashed,
      credits: 3,
      freeUsed: 0,
      lastFreeCreditDate: today,
      freeActivated: true,

      ipAddress: ip,
      deviceId,
      deviceFingerprint,

      premium: false
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ ok: true, token, message: "Registration successful." });

  } catch (err) {
    return res.json({ ok: false, error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("🔐 Login attempt:", req.body.email);
    const { email, password, deviceId, deviceFingerprint } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("📍 IP:", ip);

    if (await isProxy(ip))
      return res.json({ ok: false, message: "VPN / Proxy detected." });

    if (isBlocked(ip))
      return res.json({
        ok: false,
        message: "Too many attempts. Try again later."
      });

    const user = await User.findOne({ email });
    if (!user) {
      recordFailedAttempt(ip);
      return res.json({ ok: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      recordFailedAttempt(ip);
      return res.json({ ok: false, message: "Incorrect password" });
    }

    // İlk girişte device bilgilerini kaydet
    if (!user.deviceId && deviceId) {
      user.deviceId = deviceId;
    }
    if (!user.deviceFingerprint && deviceFingerprint) {
      user.deviceFingerprint = deviceFingerprint;
    }
    if (!user.ipAddress) {
      user.ipAddress = ip;
    }

    // Device kontrolü - sadece kayıtlı device varsa kontrol et
    if (user.deviceId && deviceId && user.deviceId !== deviceId) {
      console.log("Device mismatch:", user.deviceId, "vs", deviceId);
      // İlk girişlerde daha esnek ol
      if (user.ipAddress === ip) {
        // Aynı IP'den geliyorsa device'ı güncelle
        user.deviceId = deviceId;
      } else {
        // Farklı IP ve device - OTP iste
        const otp = generateOTP();
        otpStore[user.email] = {
          otp,
          expires: Date.now() + 5 * 60 * 1000,
          newIp: ip,
        };
        console.log("OTP for", user.email, "=", otp);
        return res.json({
          ok: false,
          otpRequired: true,
          message: "New device detected. OTP verification needed."
        });
      }
    }

    // Fingerprint kontrolü
    if (user.deviceFingerprint && deviceFingerprint && user.deviceFingerprint !== deviceFingerprint) {
      console.log("Fingerprint mismatch");
      // Aynı IP'den geliyorsa fingerprint'i güncelle
      if (user.ipAddress === ip) {
        user.deviceFingerprint = deviceFingerprint;
      } else {
        // Farklı IP - OTP iste
        const otp = generateOTP();
        otpStore[user.email] = {
          otp,
          expires: Date.now() + 5 * 60 * 1000,
          newIp: ip,
        };
        console.log("OTP for", user.email, "=", otp);
        return res.json({
          ok: false,
          otpRequired: true,
          message: "Browser changed. OTP verification needed."
        });
      }
    }

    // IP değişikliği kontrolü
    if (user.ipAddress && user.ipAddress !== ip) {
      console.log("IP changed:", user.ipAddress, "->", ip);
      const otp = generateOTP();
      otpStore[user.email] = {
        otp,
        expires: Date.now() + 5 * 60 * 1000,
        newIp: ip,
      };

      console.log("OTP for", user.email, "=", otp);

      return res.json({
        ok: false,
        otpRequired: true,
        message: "IP changed. OTP verification needed."
      });
    }

    // Device bilgilerini güncelle
    if (deviceId) user.deviceId = deviceId;
    if (deviceFingerprint) user.deviceFingerprint = deviceFingerprint;
    user.ipAddress = ip;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await user.save();

    console.log("✅ Login successful for:", email);
    return res.json({ ok: true, token, message: "Login successful" });

  } catch (err) {
    console.error("❌ Login error:", err);
    return res.json({ ok: false, error: err.message });
  }
};


exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const data = otpStore[email];
    if (!data) return res.json({ ok: false, message: "OTP expired." });

    if (Date.now() > data.expires)
      return res.json({ ok: false, message: "OTP expired." });

    if (otp !== data.otp)
      return res.json({ ok: false, message: "Incorrect OTP." });

    const user = await User.findOne({ email });
    user.ipAddress = data.newIp;
    await user.save();

    delete otpStore[email];

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      ok: true,
      token,
      message: "OTP verified."
    });

  } catch (err) {
    return res.json({ ok: false, error: err.message });
  }
};


exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.json({ ok: false, message: "User not found" });

    const deviceId = req.headers["x-device-id"] || user.deviceId || null;
    const fingerprint = req.headers["x-device-fingerprint"] || user.deviceFingerprint || null;

    const ip =
      req.headers["cf-connecting-ip"] ||              
      req.headers["x-real-ip"] ||                     
      (req.headers["x-forwarded-for"]
        ? req.headers["x-forwarded-for"].split(",")[0].trim()
        : null) ||
      req.ip ||
      req.connection?.remoteAddress ||
      "unknown";

    if (!user.deviceId && deviceId) user.deviceId = deviceId;
    if (!user.deviceFingerprint && fingerprint) user.deviceFingerprint = fingerprint;

    user.ipAddress = ip;

    const today = new Date().toISOString().split("T")[0];

    if (!user.lastFreeCreditDate) {
      user.lastFreeCreditDate = today;
      user.freeUsed = 0;
    }

    let dailyFree = 1;

    if (user.lastFreeCreditDate !== today) {
      user.lastFreeCreditDate = today;
      user.freeUsed = 0;
      dailyFree = 1;
    } else {
      dailyFree = Math.max(0, 1 - (user.freeUsed || 0));
    }

    await user.save();

    const plan = user.premium ? "Premium" : "Free";

    return res.json({
      ok: true,

      email: user.email,
      premium: user.premium,
      plan,

      credits: user.credits || 0,
      dailyFree,

      totalAnalyses: user.totalAnalyses || 0,
      todayAnalyses: user.todayAnalyses || 0,

      deviceId: user.deviceId,
      deviceFingerprint: user.deviceFingerprint,
      ipAddress: user.ipAddress
    });

  } catch (err) {
    console.error("ME ERROR:", err);
    return res.json({ ok: false, error: err.message });
  }
};


exports.changeEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user) return res.json({ ok:false, message:"User not found" });

    user.email = req.body.email;
    await user.save();

    res.json({ ok:true, email:user.email });
  } catch (err){
    res.json({ ok:false, message:err.message });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if(!user) return res.json({ ok:false, message:"User not found" });

    const match = await bcrypt.compare(oldPassword, user.password);
    if(!match) return res.json({ ok:false, message:"Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ ok:true });
  } catch (err){
    res.json({ ok:false, message:err.message });
  }
};


exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ ok:true });
  } catch (err){
    res.json({ ok:false, message:err.message });
  }
};

