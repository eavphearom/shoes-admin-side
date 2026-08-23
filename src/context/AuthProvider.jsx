import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import authService from "../features/auth/services/authService";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //Check current user
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      // No token = not authenticated
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await authService.getCurrentUser();
        setUser(response.data);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    setUser(user);

    return response;
  };

  // Logout user
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
