import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SignInContextProvider } from "./Context/SigninContext";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SignInContextProvider>
      <BrowserRouter>
        <App />;
      </BrowserRouter>
    </SignInContextProvider>
  </Provider>
);
