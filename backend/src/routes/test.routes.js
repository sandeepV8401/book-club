const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Test Ok");
  res.send("Test Ok");
});
module.exports = router;
