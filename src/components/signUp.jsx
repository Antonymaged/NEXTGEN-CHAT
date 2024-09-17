import { useState } from "react";
import styles from "./login&signup/styles.module.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../lib/upload";
import { useAuthState } from 'react-firebase-hooks/auth';

function SignUpForm() {
  const defaultimg = "../../public/avatar.png";
  const [avatar, setAvatar] = useState({
    file: null,
    url: defaultimg
  });

  const [loading, setLoading] = useState(false);

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

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgURL = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgURL,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Welcome to NEXTGEN-CHAT");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    }
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
        avatar: user.photoURL || defaultimg,
        id: user.uid,
        blocked: [],
      }, { merge: true });

      const userChatsRef = doc(db, "userchats", user.uid);
      await setDoc(userChatsRef, {
        chats: [],
      }, { merge: true });

      toast.success(`Welcome, ${user.displayName}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className={styles["form-container"] + " " + styles["sign-up-container"]}>
      <form onSubmit={handleSignup}>
        <h1>Create Account</h1>
        <div className={styles["social-container"]}>
          <a href="#" className={styles.social} onClick={handleGoogleSignIn}>
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <p style={{ color: "black" }}>or use your email for registration</p>
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
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
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
        <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
      </form>
    </div>
  );
}

export default SignUpForm;