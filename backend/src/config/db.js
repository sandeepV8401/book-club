const mongoose = require("mongoose");
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/defaultDB";
const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Mongo DB connected sucessfully");
};

module.exports = connectDB;
