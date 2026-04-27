const express = require("express");
const router = express.Router();

const {
  createSchedule,
  getSchedulesBySlot,
  deleteSchedule,
} = require("../controllers/contentScheduleController");

router.post("/schedule", createSchedule);
router.get("/schedule/slot/:slotId", getSchedulesBySlot);
router.delete("/schedule/:id", deleteSchedule);

module.exports = router;
