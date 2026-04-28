const express = require("express");
const { signup, login } = require("../controllers/userController");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userAllController");
const { authenticate } = require("../middlewares/authentication");
const { allowRoles } = require("../middlewares/roleBaseAccess");
const { loginLimiter } = require("../middlewares/rateLimiter");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginLimiter, login);

router.get("/users", authenticate, allowRoles("principal"), getAllUsers);
router.get("/users/:id", authenticate, allowRoles("principal"), getUserById);
router.patch("/users/:id", authenticate, allowRoles("principal"), updateUser);
router.delete("/users/:id", authenticate, allowRoles("principal"), deleteUser);

module.exports = router;
