import React, { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

function SignInForm() {
  const [state, setState] = useState({
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

  const handleLogin = e => {
    e.preventDefault()
    toast.success("Welcome back")
  }

  return (
    <div className={styles["form-container"] + " " + styles["sign-in-container"]}>
      <form onSubmit={handleLogin}>
        <h1>Sign in</h1>
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
        <p style={{color:"black"}}>or use your account</p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
