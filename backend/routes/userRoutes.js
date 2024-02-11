const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getUser,
  loginUser,
  registerUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/get", protect, getUser);
module.exports = router;
