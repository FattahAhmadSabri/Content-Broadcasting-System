const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, try again after 15 minutes",
});

const broadcastLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
});

module.exports = { limiter, loginLimiter, broadcastLimiter };
