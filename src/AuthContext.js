// AuthContext.js

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // Function to log the user in
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  // Function to log the user out
  const logout = () => {
    setIsLoggedIn(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("links");
  };

  // Check if user is logged in on component mount
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
