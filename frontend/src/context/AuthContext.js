// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { checkAuthAndRefresh } from "../utils/checkAuthAndRefresh";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Unified naming across app (access/refresh)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access"));

  useEffect(() => {
    const verifySession = async () => {
      const ok = await checkAuthAndRefresh();
      setIsLoggedIn(ok);
    };

    verifySession(); // 🔁 Run on mount
    const interval = setInterval(verifySession, 10 * 60 * 1000); // 🔁 Recheck every 10 minutes

    return () => clearInterval(interval);
  }, []);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    // ✅ Consistent clearing
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
