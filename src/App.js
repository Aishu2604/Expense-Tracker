import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import FrontPage from "./Front Page/FrontPage";
import SignUp from "./Sign up/Signup";
import SignInContext from "./Context/SigninContext";
import ProfilePage from "./Profile Page/ProfilePage";

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
      {isLoggedIn && (
        <Route path="/profile">
          <ProfilePage />
        </Route>
      )}
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </div>
  );
}

export default App;
