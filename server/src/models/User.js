const mongoose = require("mongoose");
const { QuestionSchema } = require("./Question");

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  attemptedQuizes: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
      quizName: String,
      questions: [QuestionSchema],
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
