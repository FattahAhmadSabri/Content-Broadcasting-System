const express = require("express");
const { signup, login } = require("../controllers/userController");
const {loginLimiter} = require("../middlewares/rateLimiter")
const router = express.Router();

router.post("/signup", signup);
router.post("/login",loginLimiter, login);

module.exports = router;
