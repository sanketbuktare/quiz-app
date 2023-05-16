import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import { AppContext } from "../contexts/AppContext";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/user/${user?.username}`)
        .then((res) => {
          console.log(res.data?.attemptedQuizes);
          setQuizzes(res.data?.attemptedQuizes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-2 md:text-left text-center">My Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes?.length === 0 ? (
          <h1 className="text-center">No Quizzes</h1>
        ) : (
          quizzes?.map((quiz, ind) => (
            <QuizCard type={1} quiz={quiz} key={ind} />
          ))
        )}
      </div>
    </>
  );
};

export default QuizList;
