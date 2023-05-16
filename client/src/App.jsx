import { useState, useContext } from "react";
import Quiz from "./components/Quiz";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./contexts/AppContext";
import Login from "./components/Login";
import QuizList from "./components/AllQuizzes";
import MyQuizzes from "./components/MyQuizzes";
import SignupPage from "./components/Signup";

const PrivateRoute = (props) => {
  const { user } = useContext(AppContext);
  if (user) {
    return props.children;
  }
  return <Navigate to="/" />;
};

function App() {
  return (
    <>
      <div className="bg-gray-100">
        <Header />
        <div className="container mx-auto py-8">
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<SignupPage />} path="/signup" />


            <Route
              element={
                <PrivateRoute>
                  <MyQuizzes />
                </PrivateRoute>
              }
              path="/my-quizes"
            />

            <Route
              element={
                <PrivateRoute>
                  <QuizList />
                </PrivateRoute>
              }
              path="/home"
            />

            <Route
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
              path="/attempt-quiz/:quizId"
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
