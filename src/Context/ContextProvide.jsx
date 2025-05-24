import React, { useEffect, useState } from "react";
import Context from "./Context";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import axios from "axios";

const ContextProvide = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const logInWithFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const userData = { email: currentUser.email };
        axios
          .post("https://server-theta-virid.vercel.app/jwt", userData, {
            withCredentials: true,
          })
          .then(() => setLoading(false));
      } else {
        axios
          .post(
            "https://server-theta-virid.vercel.app/logout",
            {},
            { withCredentials: true }
          )
          .then(() => setLoading(false));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const value = {
    theme,
    setTheme,
    createUser,
    loading,
    user,
    logoutUser,
    logInUser,
    logInWithGoogle,
    logInWithGithub,
    logInWithFacebook,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvide;
