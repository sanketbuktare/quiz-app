const express = require("express");
const cors = require("cors")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const connectDB = require("./src/config/db.config");
const quizRoutes = require("./src/routes/quiz.routes");
const userRoutes = require("./src/routes/user.routes");

const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 5000;

// connecting to mongoDB
connectDB().catch((err) => console.log(err));

app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
