import React, { useState } from "react";

const SignInContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
});

export const SignInContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
  };

  return (
    <SignInContext.Provider value={contextValue}>
      {props.children}
    </SignInContext.Provider>
  );
};

export default SignInContext;
