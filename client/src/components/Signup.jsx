import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (username && name) {
      const reqBody = {
        username: username,
        name: name,
      };
      console.log(reqBody);
      axios
        .post("http://localhost:5000/user/create-user", reqBody)
        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
