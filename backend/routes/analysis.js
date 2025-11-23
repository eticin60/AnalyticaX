    const express = require("express");
    const router = express.Router();
    const { analyzeChart, getHistory } = require("../controllers/analysisController");
    const { protect } = require("../middleware/authMiddleware");

    router.post("/chart", protect, analyzeChart);
    router.get("/history", protect, getHistory);

    module.exports = router;
