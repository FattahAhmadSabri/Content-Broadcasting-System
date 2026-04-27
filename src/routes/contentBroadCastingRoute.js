const express = require("express");
const router = express.Router();

const {
  getLiveContent,
} = require("../controllers/contentBroadcastingController");

router.get("/content/live/:teacherId", getLiveContent);

module.exports = router;
