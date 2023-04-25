// AuthContext.js

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const logout = () => {
    setIsLoggedIn(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("links");
  };

  useEffect(() => {
    if (!localStorage.getItem("isLoggedin")) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedin", true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
