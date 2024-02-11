const express = require("express");
const router = express.Router();
const {
  getMovie,
  AddMovie,
  EditMovie,
  DeleteMovie,
} = require("../controllers/movieControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMovie).post(protect, AddMovie);
router.route("/:id").delete(protect, DeleteMovie).put(protect, EditMovie);
module.exports = router;
