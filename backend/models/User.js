const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    credits: {
      type: Number,
      default: 0,
    },

    freeCreditsToday: {
      type: Number,
      default: 1,
    },

    lastFreeCreditDate: {
      type: String, 
    },

    freeUsed: {
      type: Number,
      default: 0,
    },

    freeActivated: {
      type: Boolean,
      default: true,
    },

    premium: {
      type: Boolean,
      default: false,
    },

    ipAddress: {
      type: String,
      default: null,
    },

    deviceId: {
      type: String,
      default: null,
    },

    deviceFingerprint: {
      type: String,
      default: null,
    },

    totalAnalyses: {
      type: Number,
      default: 0,
    },

    todayAnalyses: {
      type: Number,
      default: 0,
    },

    purchases: [
      {
        amount: Number,
        method: String, 
        txid: String,
        approved: Boolean,
        date: { type: Date, default: Date.now },
      },
    ],

    history: [
      {
        _id: { type: String },
        symbol: String,
        queryId: String,   
        timeframe: String,
        trend: String,
        risk: String,
            userId: String,
        status: String,
            symbol: String,
            image: String,
        result: Object,
        createdAt: Date
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
