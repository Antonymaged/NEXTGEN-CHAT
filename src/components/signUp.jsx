import React, { useState } from "react";
import styles from "./login&signup/styles.module.css";
import { toast } from "react-toastify";

function SignUpForm() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ''
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  // const handleOnSubmit = evt => {
  //   evt.preventDefault();
  //   for (const key in state) {
  //     setState({
  //       ...state,
  //       [key]: ""
  //     });
  //   }
  // };

  const handleSignup = (e) => {
    e.preventDefault()
    toast.success("Welcome to NEXTGEN-CHAT")
  }

  return (
    <div className={styles["form-container"] + " " + styles["sign-up-container"]}>
      <form onSubmit={handleSignup}>
        <h1>Create Account</h1>
        <div className={styles["social-container"]}>
          <a href="#" className={styles.social}>
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className={styles.social}>
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className={styles.social}>
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <p style={{color:"black"}}>or use your email for registration</p>
        <div className={styles.profilepic}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Choose your photo
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
        </div>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;