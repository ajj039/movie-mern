const asyncHandler = require("express-async-handler");
const Movie = require("../model/movieModel");
const User = require("../model/userModel");
const getMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.find({ user: req.user.id });

  console.log("moview12121", movie);
  res.status(200).json({ message: "movie fetched", data: movie });
});

const AddMovie = asyncHandler(async (req, res) => {
  const { name, language } = req.body;
  if (!name || !language) {
    res.status(400);
    throw new Error("all fields are required!!");
  }
  const newMovie = await Movie.create({
    name: name,
    language: language,
    user: req.user.id,
  });
  res.status(200).json(newMovie);
});

const EditMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(400);
    throw new Error("movie does not exist");
  }

  if (!req.user) {
    res.status(500);
    throw new Error("user does not found");
  }

  if (movie.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: "movie edited",
    data: {
      updatedMovie,
    },
  });
});

const DeleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(400);
    throw new Error("movie does not exist");
  }

  if (!req.user) {
    res.status(500);
    throw new Error("user does not found");
  }
  if (movie.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await movie.remove();
  res.status(200).json({ id: movie.id, message: "movie deleted" });
});

module.exports = {
  getMovie,
  AddMovie,
  EditMovie,
  DeleteMovie,
};
