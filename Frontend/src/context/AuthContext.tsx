// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { User, UserRole, AuthContextType } from "../types";
import { authService } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("app_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (role: UserRole) => {
    try {
      const userData = await authService.login("test@example.com", role);

      setUser(userData);
      localStorage.setItem("app_user", JSON.stringify(userData));
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("app_user");
  }, []);

  const isAdmin = useMemo(() => user?.role === "ADMIN", [user]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
