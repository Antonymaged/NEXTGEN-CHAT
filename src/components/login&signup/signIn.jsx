import React, { useState } from "react";
import styles from "./styles.module.css";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL || "../../public/avatar.png", // Use a default avatar if none exists
        id: user.uid,
        blocked: [],
      }, { merge: true });

      const userChatsRef = doc(db, "userchats", user.uid);
      await setDoc(userChatsRef, {
        chats: [],
      }, { merge: true });

      toast.success(`Welcome back, ${user.displayName}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["form-container"] + " " + styles["sign-in-container"]}>
      <form onSubmit={handleLogin}>
        <h1>Sign in</h1>
        <div className={styles["social-container"]}>
          <a className={styles.social} onClick={handleGoogleSignIn}>
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <p style={{ color: "black" }}>or use your account</p>
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
        {/* <a href="#">Forgot your password?</a> */}
        <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
      </form>
    </div>
  );
}

export default SignInForm;
