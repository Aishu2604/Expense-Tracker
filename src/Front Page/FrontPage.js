import React from "react";
import "./FrontPage.css";
import { Link, useHistory } from "react-router-dom";
import { authAction } from "../store/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "../store/theme-reducer";

const FrontPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.token);
  const premium = useSelector((state) => state.theme.onPremium);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(theme);
  const logoutHandler = () => {
    dispatch(authAction.removeExpenseToken());
    history.replace("/login");
  };

  const themeChangeHandler = () => {
    dispatch(themeAction.toggleTheme());
  };
  return (
    <div className="complete">
      {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
      <Link to="/Verification">
        <button>Verify E-Mail</button>
      </Link>
      {console.log(premium)}
      {premium && (
        <button onClick={themeChangeHandler}>
          {theme ? "light mode" : "dark mode"}
        </button>
      )}
      <div className="header">
        <Link to="/"></Link>
        <h4>Welcome To Expense Tracker</h4>
      </div>
      <br />
      <div className="header1">
        <h4>Your Profile is Incomplete</h4>
        <Link to="/profile">Complete Now</Link>
        <h4> Track Your Expenses</h4>
        <Link to="/expense">Expense Tracker</Link>
      </div>

      <hr />
    </div>
  );
};

export default FrontPage;
