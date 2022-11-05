import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import FrontPage from "./Front Page/FrontPage";
import SignUp from "./Sign up/Signup";
import SignInContext from "./Context/SigninContext";
import ProfilePage from "./Profile Page/ProfilePage";
import VerifyEmail from "./VERIFY/VerifyEmail";
import ForgotPassword from "./Forget Password/ForgetPassword";
import ExpenseForm from "./Expenses/ExpenseForm";

function App() {
  const signCtx = useContext(SignInContext);
  const isLoggedIn = signCtx.isLoggedIn;
  return (
    <div>
      {isLoggedIn && (
        <Route path="/Verification">
          <VerifyEmail />
        </Route>
      )}
      {isLoggedIn && (
        <Route path="/expense">
          <ExpenseForm />
        </Route>
      )}
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
      {!isLoggedIn && (
        <Route path="/forgotPassword">
          <ForgotPassword />
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
