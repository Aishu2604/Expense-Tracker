import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import FrontPage from "./Front Page/FrontPage";
import SignUp from "./Sign up/Signup";
import ProfilePage from "./Profile Page/ProfilePage";
import VerifyEmail from "./VERIFY/VerifyEmail";
import ForgotPassword from "./Forget Password/ForgetPassword";
import ExpenseForm from "./Expenses/ExpenseForm";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const premium = useSelector((state) => state.expense.premiumButton);
  const isLoggedIn = useSelector((state) => state.auth.token);

  return (
    <div style={{ backgroungColor: premium && theme ? "grey" : "white" }}>
      <Switch>
        {isLoggedIn && (
          <Route path="/Verification">
            <VerifyEmail />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/profile">
            <ProfilePage />
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

        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
