const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const CONNECTION_STRING =
  process.env.CONNECTION_STRING || "mongodb://localhost:27017/quiz-app";

async function connectDB() {
  await mongoose.connect(CONNECTION_STRING);
  console.log("DB connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connectDB