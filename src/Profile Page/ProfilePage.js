import React, { useContext, useEffect, useRef } from "react";
import classes from "./ProfilePage.module.css";
import SignInContext from "../Context/SigninContext";
import axios from "axios";

const ProfilePage = () => {
  const nameRef = useRef();
  const profileRef = useRef();
  const signCtx = useContext(SignInContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const profile = profileRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBtIWvTixlyXavVonxVrwMi4aIzYMWD1_A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: signCtx.token,
          displayName: name,
          photoUrl: profile,
          deleteAttribute: "Display_Name",
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
    });

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBtIWvTixlyXavVonxVrwMi4aIzYMWD1_A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: signCtx.token,
        }),
      }
    )
      .then((res) => {
        alert("your form is updated");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className={classes.contain}>
      <header>
        <div>
          <h1>Contact Details</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label>Name:</label>
            <br></br>
            <input type="text" required ref={nameRef}></input>
          </div>
          <div className={classes.control}>
            <label>Profile Photo URL:</label>
            <br></br>
            <input type="text" required ref={profileRef}></input>
          </div>
          <div className={classes.action}>
            <button>Update</button>
          </div>
        </form>
      </header>
    </section>
  );
};

export default ProfilePage;
