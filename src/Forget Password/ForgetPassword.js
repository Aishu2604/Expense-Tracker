import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ForgetPassword.module.css";

const ForgotPassword = () => {
  const emailRef = useRef();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBtIWvTixlyXavVonxVrwMi4aIzYMWD1_A",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
      history.replace("/login");
    });
  };

  return (
    <section className={classes.contain}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            required
            ref={emailRef}
            placeholder="E-Mail"
          />
        </div>
        <div className={classes.toggle}>
          <button>Submit</button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
