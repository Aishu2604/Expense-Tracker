import React, { useContext } from "react";
import "./FrontPage.css";
import { Link } from "react-router-dom";
import SignInContext from "../Context/SigninContext";

const FrontPage = () => {
  const signCtx = useContext(SignInContext)
  const logoutHandler = () => {
    signCtx.logout()
  }
  return (
    <div className="complete">
      <button onClick={logoutHandler}>Logout</button>
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
      </div>

      <hr />
    </div>
  );
};

export default FrontPage;
