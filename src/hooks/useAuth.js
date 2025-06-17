// hooks/useAuth.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (credentials) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const { token } = await res.json();
    localStorage.setItem("authToken", token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && jwtDecode(token).exp * 1000 > Date.now()) {
      setUser(jwtDecode(token));
    }
    setLoading(false);
  }, []);

  return { user, loading, login, logout };
};
