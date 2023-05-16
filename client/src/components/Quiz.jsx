import React, { useState, useEffect, useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [quizDetails, setQuizDetails] = useState(null);

  const navigate = useNavigate();
  const { quizId } = useParams();
  const { user } = useContext(AppContext);
  const { questions } = quizDetails || {};

  useEffect(() => {
    if (!user) return;
    const reqBody = {
      userId: user?._id,
      quizId: quizId,
    };
    console.log("Req body", reqBody);
    axios
      .post("http://localhost:5000/quiz/attempt", reqBody)
      .then((res) => {
        console.log(res.data);
        setQuizDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [quizId, user]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      handleNext();
    }
  }, [remainingTime]);

  useEffect(() => {
    if (questions && questions?.length > 0) {
      setCurrentAnswer(questions[currentQuestion]?.userAnswer);
      setRemainingTime(questions[currentQuestion]?.time);
    }
  }, [currentQuestion, questions]);

  const handleNext = (id) => {
    if (!questions || questions?.length === 0) return;

    const nextQuestion = currentQuestion + 1;
    const reqBody = {
      userId: user?._id,
      quizId: quizId,
      answer: currentAnswer,
      questionId: questions[currentQuestion]?._id,
    };
    axios
      .put("http://localhost:5000/quiz/save-question", reqBody)
      .then((res) => {
        console.log(res.data);
        setQuizDetails((prev) => {
          const tempArr = [...prev.questions];
          tempArr[currentQuestion].time = remainingTime;
          tempArr[currentQuestion].userAnswer = currentAnswer;
          return { ...prev, questions: tempArr };
        });
        if (nextQuestion === questions?.length) {
          setShowScore(true);
        } else {
          setCurrentQuestion(nextQuestion);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const score = questions?.reduce((totalMarks, question) => {
    if (question.correctAnswer === question.userAnswer)
      return totalMarks + question.correctMarks;
    else return 0;
  }, 0);

  return (
    <div className="bg-gray-100 min-h-screen ">
      {/* <Header timeLeft={10} /> */}
      <h1 className="text-3xl font-bold text-gray-800 md:text-left text-center py-1">
        {quizDetails?.quizName}
      </h1>

      {showScore ? (
        <div className="p-8 bg-white rounded shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">Quiz Complete!</h1>
          <p className="mt-4 text-xl">Your score: {score}</p>
          <button
            className={`px-4 py-2 disabled:opacity-75 text-white bg-indigo-500 hover:bg-indigo-600 rounded  focus:outline-none`}
            onClick={() => navigate("/home")}
          >
            Go Home
          </button>
        </div>
      ) : (
        <>
          {questions && questions[currentQuestion] && (
            <div className="p-8 bg-white rounded shadow-md ">
              <div className="container mx-auto p-1 flex items-center justify-between gap-4 md:flex-row flex-col">
                <h2 className="text-2xl text-gray-800">
                  Question {currentQuestion + 1}/{questions?.length}
                </h2>

                <div style={{ width: 100, height: 100 }}>
                  <CircularProgressbar
                    value={remainingTime}
                    text={remainingTime}
                    maxValue={questions[currentQuestion]?.time}
                  />
                </div>
              </div>

              {/************** question **************/}
              <h2 className="text-2xl text-gray-800 md:text-left text-center">
                {questions[currentQuestion]?.question}
              </h2>

              {/************** options **************/}
              <div className="text-left mt-2 md:space-y-2 md:flex md:flex-col md:place-items-start grid grid-cols-2 justify-items-start place-items-center ">
                {questions[currentQuestion]?.options?.map((option, ind) => (
                  <label
                    key={ind}
                    className="inline-flex items-center space-x-2 cursor-pointer my-1 "
                  >
                    <input
                      type="radio"
                      className="form-radio text-indigo-600 h-4 w-4"
                      value={option}
                      checked={option === currentAnswer}
                      onChange={() => setCurrentAnswer(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              {/************** buttons **************/}
              <div className="container mx-auto mt-5 flex sm:justify-between justify-evenly">
                <button
                  className="px-4 py-2 disabled:opacity-75 text-white bg-indigo-500 rounded enabled:hover:bg-indigo-600 focus:outline-none"
                  // onClick={onClick}
                  disabled={currentQuestion === 0}
                  onClick={handlePrev}
                >
                  Prev
                </button>
                <button
                  className={`px-4 py-2 disabled:opacity-75 text-white ${
                    currentQuestion === questions?.length - 1
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  } rounded  focus:outline-none`}
                  onClick={handleNext}
                >
                  {currentQuestion === questions?.length - 1
                    ? "Submit"
                    : "Next"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
