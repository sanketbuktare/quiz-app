const mongoose = require("mongoose");
const { QuestionSchema } = require("./Question");

const QuizSchema = new mongoose.Schema({
  type: String,
  quizName: String,
//   ratings: [
//     {
//       userId: {
//         type: mongoose.Schema.Types.ObjectId(),
//         ref: "User",
//       },
//       rating: {
//         type: Number,
//         min: 1,
//         max: 5,
//       },
//     },
//   ],
  questions: [QuestionSchema], //{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
