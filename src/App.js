import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import FrontPage from "./Front Page/FrontPage";
import SignUp from "./Sign up/Signup";
import SignInContext from "./Context/SigninContext";

function App() {
  const signCtx = useContext(SignInContext);
  const isLoggedIn = signCtx.isLoggedIn;
  return (
    <div>
      {isLoggedIn && (
        <Route path="/">
          <FrontPage />
        </Route>
      )}
      {!isLoggedIn && (
        <Route path="/login">
          <SignUp />
        </Route>
      )}
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </div>
  );
}

export default App;
