import React, { useContext } from "react";
import SignInContext from "../Context/SigninContext";
import { useHistory } from "react-router-dom";
import "./VerifyEmail.css"
const VerifyEmail = () => {
  const signCtx = useContext(SignInContext);
  const history = useHistory()

  const verifyMailHandler = (e) => {
    e.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBtIWvTixlyXavVonxVrwMi4aIzYMWD1_A",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: signCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        history.replace("/profile");
      })
      .catch((err) => {
        console.log(err);
        alert("Something Went Wront........Please Login Again");
      });
  };

  return (
    <div className="header">
      <h2> Verify Your Email</h2>
      <button onClick={verifyMailHandler}>Click Here</button>
    </div>
  );
};

export default VerifyEmail;
