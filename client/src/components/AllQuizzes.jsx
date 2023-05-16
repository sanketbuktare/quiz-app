import axios from "axios";
import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import quizData from "../data/json/quizData.json"

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);


  useEffect(() => {
    console.log(quizData)
    axios
      .get("http://localhost:5000/quiz/all")
      .then((res) => {
        console.log(res.data);
        setQuizzes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes?.length === 0 ? (
        <h1 className="text-center">No Quizzes</h1>
      ) : (
        quizzes?.map((quiz, ind) => (
          <QuizCard quiz={quiz} key={ind} />
        ))
      )}
    </div>
  );
};

export default QuizList;
