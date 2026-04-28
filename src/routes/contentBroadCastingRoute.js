const express = require("express");
const router = express.Router();
const { broadcastLimiter } = require("../middlewares/rateLimiter");

const {
  getLiveContent,
} = require("../controllers/contentBroadcastingController");

router.get("/content/live/:teacherId", broadcastLimiter, getLiveContent);

module.exports = router;
