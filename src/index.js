import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SignInContextProvider } from "./Context/SigninContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SignInContextProvider>
    <BrowserRouter>
      <App />;
    </BrowserRouter>
  </SignInContextProvider>
);
