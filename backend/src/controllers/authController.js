const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }
    //  hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      token,
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    if (user.isDeleted) {
      return res.status(403).json({
        success: false,
        message: "Account has been deleted",
      });
    }
    const isMatchPassword = bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      token,
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
module.exports = { signupUser, loginUser };
