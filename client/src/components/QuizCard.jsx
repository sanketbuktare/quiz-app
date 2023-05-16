import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz, type }) => {
  const navigate = useNavigate();

  const getSum = (questions, getScore) => {
    return questions?.reduce((totalMarks, question) => {
      if (getScore)
        return question.correctAnswer === question.userAnswer
          ? totalMarks + question.correctMarks
          : totalMarks;
      return totalMarks + question.correctMarks;
    }, 0);
  };

  const handleAttemptQuiz = (id) => {
    navigate(`/attempt-quiz/${id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-4 my-4 md:w-1/2">
      <h2 className="text-xl font-semibold mb-2">{quiz.quizName}</h2>
      <p className="text-gray-600 mb-2">
        Total Questions: {quiz?.questions?.length}
      </p>
      <p className="text-gray-600">
        Total Marks: {getSum(quiz?.questions, false)}
      </p>

      {type === 1 && (
        <p className="text-gray-600">
          Your Score: {getSum(quiz?.questions, true)}
        </p>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => handleAttemptQuiz(quiz._id)}
      >
        Attempt Quiz
      </button>
    </div>
  );
};

export default QuizCard;
