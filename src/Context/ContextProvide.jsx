import React, { useEffect, useState } from "react";
import Context from "./Context";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../Firebase/Firebase.config";

const ContextProvide = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  // yarn jsrepo add https://reactbits.dev/tailwind/Components/SpotlightCard

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if(currentUser) {
      setLoading(false);
    } else {
      setLoading(false);
    }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  const value = {
    theme,
    setTheme,
    createUser,
    loading,
    user,
    logoutUser,
    logInUser,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvide;
