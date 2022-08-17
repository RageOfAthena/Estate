import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDBOB_RXz-TCzF97UYxzKLw2cmBw_uF34c",
  authDomain: "realestate-747d3.firebaseapp.com",
  projectId: "realestate-747d3",
  storageBucket: "realestate-747d3.appspot.com",
  messagingSenderId: "784763857507",
  appId: "1:784763857507:web:d89a60f1d88dadf7c86656",
  measurementId: "G-ZLE5L0DYDW",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
