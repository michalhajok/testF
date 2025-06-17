"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromToken, login, logout } from "@/lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    setUser(token ? getUserFromToken(token) : null);
  }, []);

  const handleLogin = async (credentials) => {
    const { token } = await login(credentials);
    localStorage.setItem("authToken", token);
    setUser(getUserFromToken(token));
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
