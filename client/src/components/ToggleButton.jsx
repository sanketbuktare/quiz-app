import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const ThemeToggleButton = () => {
  const { isDark, setIsDark } = useContext(AppContext);

  const handleToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      className=" p-2 rounded-full bg-gray-200 text-gray-800"
      onClick={handleToggle}
    >
      {isDark ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggleButton;
