import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
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

  // async function addExpensesHandler(expense) {
  //   const response = await fetch(
  //     "https://expense-tracker-f9b22-default-rtdb.firebaseio.com/expense.json",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(expense),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // }

  return (
    <div>
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
            <ExpenseForm  />
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
