import React, { useContext } from "react";
import "./FrontPage.css";
import { Link, useHistory } from "react-router-dom";
import SignInContext from "../Context/SigninContext";
import { authAction } from "../store/auth-reducer";
import { useDispatch, useSelector } from "react-redux";

const FrontPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();
  // const signCtx = useContext(SignInContext);
  const logoutHandler = () => {
    // signCtx.logout();
    dispatch(authAction.removeExpenseToken());
    history.replace("/login");
  };
  return (
    <div className="complete">
      {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
      <Link to="/Verification">
        <button>Verify E-Mail</button>
      </Link>
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
