import React, { useState } from "react";
import styles from "./styles.module.css";
import SignInForm from "./signIn";
import SignUpForm from "../signUp";

export default function Panel() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    `${styles.container} ${type === "signUp" ? styles["right-panel-active"] : ""}`;
  return (
    <div className={styles.App}>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className={styles["overlay-container"]}>
          <div className={styles.overlay}>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}>
              <h1 style={{color:"white"}}>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className={`${styles.ghost}`}
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}>
              <h1 style={{color:"white"}}>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className={`${styles.ghost}`}
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
