import React from "react";
import "./FrontPage.css";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div className="complete">
    <div className="header">
      <Link to="/"></Link>
      <h4>Welcome To Expense Tracker</h4>
      </div>
      <br/>
      <div className="header1">
      <h4>Your Profile is Incomplete</h4>
      <Link to="/profile">Complete Now</Link>
      </div>
      <hr />
    
    </div>
  );
};

export default FrontPage;
