import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        setLoading(true);
        const me = await getCurrentUser(token);
        setUser(me);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
    const me = await getCurrentUser(data.access_token);
    setUser(me);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const register = async (username, email, password) => {
    await registerUser(username, email, password);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};