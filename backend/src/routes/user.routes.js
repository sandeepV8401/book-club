const express = require("express");
const { getProfile, updateProfile, deleteAccount } = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware")
const {updateProfileSchema} = require("../validators/user.schema")
const router = express.Router();
router.get("/profile", protect, getProfile);
router.put("/profile",protect, validate(updateProfileSchema),updateProfile)
router.delete("/profile",protect,deleteAccount)
module.exports = router;
