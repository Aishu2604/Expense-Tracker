import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./ProfilePage.module.css";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const nameRef = useRef();
  const profileRef = useRef();
  const [store, setStore] = useState();
  const [email, setEmail] = useState();
  const [url, setUrl] = useState();
  // const signCtx = useContext(SignInContext);
  const token = useSelector((state) => state.auth.token);

  const submitHandler = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const profile = profileRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBtIWvTixlyXavVonxVrwMi4aIzYMWD1_A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
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
      setStore(res);
    });
  };
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBtIWvTixlyXavVonxVrwMi4aIzYMWD1_A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          // console.log(res.json());
          alert("your form is updated");
          res.json().then((data) => {
            console.log(data);
            setEmail(data.users[0].email);
            setUrl(data.users[0].photoUrl);
          });
        } else {
          res.json().then((data) => console.log(data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [store]);
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
            <input
              type="text"
              required
              ref={nameRef}
              defaultValue={email}
              // value={signCtx.preinfo.name}
            ></input>
          </div>
          <div className={classes.control}>
            <label>Profile Photo URL:</label>
            <br></br>
            <input
              type="text"
              required
              ref={profileRef}
              defaultValue={url}
              // value={signCtx.preinfo.url}
            ></input>
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
