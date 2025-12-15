const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const testRoutes = require("./test.routes");
const userRoutes = require("./user.routes");


router.use("/test", testRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
