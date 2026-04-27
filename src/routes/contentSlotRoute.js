const express = require("express");
const { authenticate } = require("../middlewares/authentication");
const { allowRoles } = require("../middlewares/roleBaseAccess");
const {
  createSlot,
  getSlots,
  getSlotById,
  getSlotBySubject,
  deleteSlot,
} = require("../controllers/contentSlotController");

const router = express.Router();

router.post(
  "/slot",
  authenticate,
  allowRoles("teacher", "principal"),

  createSlot,
);

router.get("/slot", authenticate, allowRoles("teacher", "principal"), getSlots);

router.get(
  "/slot/subject/:subject",
  authenticate,
  allowRoles("teacher", "principal"),
  getSlotBySubject,
);

router.get(
  "/slot/:id",
  authenticate,
  allowRoles("teacher", "principal"),
  getSlotById,
);

router.delete(
  "/slot/:id",
  authenticate,
  allowRoles("teacher", "principal"),
  deleteSlot,
);

module.exports = router;
