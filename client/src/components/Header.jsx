import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const buttons = [
  // {
  //   label: "Profile",
  //   path: "/profile",
  // },
  {
    label: "My Quizes",
    path: "/my-quizes",
  },
  {
    label: "Logout",
    path: "/",
  },
];

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (path) => {
    if (path === "/") {
      setUser(null);
    }
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="relative flex justify-between items-center py-4 px-8 bg-gray-900 text-white">
      <h1
        className="text-3xl font-bold cursor-pointer"
        onClick={() => handleNavigate("/home")}
      >
        Quiz App
      </h1>
      {user && (
        <div className="flex items-center space-x-2">
          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6H20V8H4V6ZM4 12H20V14H4V12ZM4 18H20V20H4V18Z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="mt-2 p-2 rounded bg-gray-500 absolute shadow-md bottom-100 right-0">
                {buttons?.map((b, ind) => (
                  <button
                    key={ind}
                    onClick={() => handleNavigate(b.path)}
                    className="block my-1 text-gray-300 hover:text-white focus:outline-none focus:text-white"
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="hidden md:flex md:items-center gap-1">
            {buttons?.map((b, ind) => (
              <button
                key={ind}
                onClick={() => handleNavigate(b.path)}
                className="mx-3 text-gray-300 hover:text-white focus:outline-none focus:text-white"
              >
                {b.label}
              </button>
            ))}
            <div className="h-8 w-8 pt-1 rounded-full bg-gray-300 flex align-center justify-center">
              <span>{user?.name?.[0]}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
