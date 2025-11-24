    const express = require("express");
    const router = express.Router();
    const { analyzeChart, getHistory } = require("../controllers/analysisController");
    const { chat } = require("../controllers/chatController");
    const { protect } = require("../middleware/authMiddleware");

    router.post("/chart", protect, analyzeChart);
    router.get("/history", protect, getHistory);
    router.post("/chat", chat);

    module.exports = router;
