/* eslint-disable */
import React, { useState, useEffect } from "react";

const AppContext = React.createContext();

const AppContextProvider = (props) => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     console.log(isDark)
  //     if (isDark) document.documentElement.classList.add("dark");
  //     else document.documentElement.classList.remove("dark");
  //   }, [isDark]);

  return (
    <AppContext.Provider
      value={{
        isDark,
        setIsDark,
        user,
        setUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
