const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require("axios");

let loginAttempts = {};

function getRealIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "0.0.0.0";
}

function isBlocked(ip) {
  if (!loginAttempts[ip]) return false;
  const attempt = loginAttempts[ip];
  const now = Date.now();
  return attempt.count >= 5 && now - attempt.lastAttempt < 15 * 60 * 1000;
}

function recordAttempt(ip) {
  const now = Date.now();
  if (!loginAttempts[ip]) {
    loginAttempts[ip] = { count: 1, lastAttempt: now };
  } else {
    loginAttempts[ip].count++;
    loginAttempts[ip].lastAttempt = now;
  }
}

async function isProxy(ip) {
  try {
    const url = `http://ip-api.com/json/${ip}?fields=proxy,mobile,hosting`;
    const res = await axios.get(url);
    return res.data.proxy === true || res.data.hosting === true;
  } catch {
    return false;
  }
}

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ ok: false, error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ ok: false, error: "User not found" });

    const ip = getRealIp(req);

    if (await isProxy(ip)) {
      return res.json({
        ok: false,
        error: "VPN / Proxy detected — disable it to continue.",
      });
    }

    if (isBlocked(ip)) {
      return res.json({
        ok: false,
        error: "Too many attempts — wait 15 minutes.",
      });
    }

    const clientFingerprint = req.headers["x-device-fingerprint"];
    if (!clientFingerprint) {
      return res.json({
        ok: false,
        error: "Missing device fingerprint.",
      });
    }

    if (user.deviceFingerprint && user.deviceFingerprint !== clientFingerprint) {
      return res.json({
        ok: false,
        otpRequired: true,
        message: "New device detected. OTP verification required.",
      });
    }

    if (user.ipAddress && user.ipAddress !== ip) {
      return res.json({
        ok: false,
        otpRequired: true,
        message: "IP changed. OTP verification required.",
      });
    }

    if (!user.ipAddress) {
      user.ipAddress = ip;
      await user.save();
    }

    if (!user.deviceFingerprint) {
      user.deviceFingerprint = clientFingerprint;
      await user.save();
    }

    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
};
