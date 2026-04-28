const express = require("express");
const upload = require("../middlewares/upload");
const { authenticate } = require("../middlewares/authentication");
const { allowRoles } = require("../middlewares/roleBaseAccess");
const {
  createContent,
  updateContentDetails,
  updateContentStatus,
  getContent,
  getApprovedContent,
} = require("../controllers/contentController");

const router = express.Router();

router.post(
  "/content",
  authenticate,
  allowRoles("teacher"),
  upload.single("file"),
  createContent,
);

router.patch(
  "/content/:id",
  authenticate,
  allowRoles("principal", "teacher"),
  updateContentDetails,
);

router.patch(
  "/contentStatus/:id",
  authenticate,
  allowRoles("principal"),
  updateContentStatus,
);

router.get(
  "/content",
  authenticate,
  allowRoles("principal", "teacher"),
  getContent,
);
router.get("/content-student", getApprovedContent);

module.exports = router;
