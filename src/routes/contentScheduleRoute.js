const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authentication");
const { allowRoles } = require("../middlewares/roleBaseAccess");

const {
  createSchedule,
  getSchedulesBySlot,
  deleteSchedule,
} = require("../controllers/contentScheduleController");

router.post("/schedule",authenticate,allowRoles("principal"),  createSchedule);
router.get("/schedule/slot/:slotId",  getSchedulesBySlot);
router.delete("/schedule/:id",authenticate,allowRoles("principal"), deleteSchedule);

module.exports = router;
