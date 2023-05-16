const express = require("express");
const Quiz = require("../models/Quiz");
const User = require("../models/User");

const quiz = express.Router();

quiz.get("/all", async (req, res) => {
  try {
    const docs = await Quiz.find({});
    res.json(docs);
  } catch (err) {
    console.log(err);
    res.json({ message: "Someting went wrong", ...err });
  }
});

quiz.get("/id=:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Quiz.findOne({ _id: id }).exec();
    if (!doc) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(doc);
  } catch (err) {
    res.json({ message: "Someting went wrong", ...err });
  }
});

quiz.post("/create-quiz", async (req, res) => {
  try {
    const quiz = new Quiz();
    quiz.type = req.body.type;
    quiz.quizName = req.body.quizName;
    quiz.questions = req.body.questions;

    const doc = await quiz.save();
    res.json({ message: "Created new quiz", ...doc._doc });
  } catch (err) {
    res.json({ message: "Someting went wrong", ...err });
  }
});

quiz.post("/attempt", async (req, res) => {
  try {
    const { userId, quizId } = req.body;
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the quiz already exists in attemptedQuizzes array
    const attemptedQuizIndex = user.attemptedQuizes.findIndex(
      (quiz) => quiz.quizId.toString() === quizId
    );

    const quizDoc = await Quiz.findOne({ _id: quizId }).exec();
    if (!quizDoc) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const data = {
      quizName: quizDoc.quizName,
      quizId: quizDoc._id,
      questions: quizDoc.questions,
    };
    if (attemptedQuizIndex !== -1) {
      // Quiz exists, update it
      user.attemptedQuizes[attemptedQuizIndex] = data;
      await user.updateOne().then(() => console.log("Updated"));
    } else {
      // Quiz doesn't exist, add it
      user.attemptedQuizes.push(data);
      await user.save().then(() => console.log("Saved"));
    }

    res.status(200).json(quizDoc);
  } catch (err) {
    console.log(err);
    res.json({ message: "Someting went wrong", ...err });
  }
});

quiz.put("/save-question", async (req, res) => {
  try {
    const { userId, quizId, answer, questionId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      console.log("User Not Found");
      return res.status(404).json({ message: "User not found" });
    }

    // Find the attempted quiz by quiz ID
    const attemptedQuiz = user.attemptedQuizes.find(
      (quiz) => quiz.quizId.toString() === quizId
    );

    if (!attemptedQuiz) {
      console.log("Quiz Not Found");
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Update the answer for the specified question index
    const question = attemptedQuiz.questions.find(
      (ques) => ques._id.toString() === questionId
    );
    // console.log(question, questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    question.userAnswer = answer;

    // Save the updated user object
    await user.save();
    res.status(200).json({ message: "Answer Saved" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Someting went wrong", ...err });
  }
});

module.exports = quiz;
