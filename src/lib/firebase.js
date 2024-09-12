import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "nextgen-chat-dade6.firebaseapp.com",
  projectId: "nextgen-chat-dade6",
  storageBucket: "nextgen-chat-dade6.appspot.com",
  messagingSenderId: "102050100707",
  appId: "1:102050100707:web:4d02760a3c2fd8b0f05cd6",
  measurementId: "G-B0P51FXVKV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()