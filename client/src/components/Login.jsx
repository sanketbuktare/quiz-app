import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  const handleLogin = () => {
    // Perform login logic
    // You can use the 'username' state value for further processing
    console.log(`Logging in as ${username}`);
    axios
      .get("http://localhost:5000/user/" + username)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleLogin}
        >
          Login
        </button>
        <Link to="/signup"> Go to Signup</Link>
      </div>
    </div>
  );
};

export default Login;
