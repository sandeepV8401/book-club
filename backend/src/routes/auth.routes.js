const express = require("express");
const { signupUser, loginUser } = require("../controllers/authController");
const { signupSchema } = require("../validator/auth.validator");
const validate = require("../middlewares/validateMiddleware");
const router = express.Router();

router.post("/signup", validate(signupSchema), signupUser);
router.post("/login",loginUser);
module.exports = router;
