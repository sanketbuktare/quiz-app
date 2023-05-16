const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  userAnswer: String,
  time: {
    type: Number,
    min: 10,
  },
  correctMarks: Number,
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = {
  Question: Question,
  QuestionSchema: QuestionSchema,
};
