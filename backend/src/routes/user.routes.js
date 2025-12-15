const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware")
const {updateProfileSchema} = require("../validators/user.schema")
const router = express.Router();
router.get("/profile", protect, getProfile);
router.put("/profile",protect, validate(updateProfileSchema),updateProfile)
module.exports = router;
