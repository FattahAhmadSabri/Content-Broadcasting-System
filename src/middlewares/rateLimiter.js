const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const redisClient = require("../config/redisClient");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many requests, please try again later",
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many login attempts, try again after 15 minutes",
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

// Broadcast Limiter
const broadcastLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many broadcast requests",
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

module.exports = {
  limiter,
  loginLimiter,
  broadcastLimiter,
};
