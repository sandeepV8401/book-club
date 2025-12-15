const bcrypt = require("bcryptjs");
const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Some error occured", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // duplicate email handling
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }
    console.log("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const deleteAccount = async (req,res) =>{
    try {
        const userId = req.user._id
       const user =  await User.findById(userId)
         if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
       user.isDeleted = true
       await user.save();
         res.status(200).json({
      success: true,
      message: "Account deleted successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
        
    } catch (error) {
         console.log("Some error occured:", error);
    res.status(500).json({ success: false, message: "Server error" });
    }
}
module.exports = { getProfile, updateProfile, deleteAccount };
