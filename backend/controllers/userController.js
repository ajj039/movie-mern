const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add fields");
  }
  // check if user exist

  const userExists = await user.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newuser = await user.create({
    name,
    email,
    password: hashedPassword,
  });
  if (newuser) {
    res.status(200).json({
      id: newuser._id,
      name: newuser.name,
      email: newuser.email,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }

  const userExist = await user.findOne({ email });
  if (!userExist) {
    res.status(400);
    throw new Error("user does not exist");
  }
  const userpassword = await bcrypt.compare(password, userExist.password);
  if (user && userpassword) {
    res.status(200).json({
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
  //   res.status(200).json({ message: "register user" });
});
const getUser = asyncHandler(async (req, res) => {
  const { _id, email, name } = await user.findById(req.user.id);
  res.status(200).json({ id: _id, name: name, email: email });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
