import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { isAxiosError } from "axios";
import type {
  User,
  AuthContextType,
  LoginCredentials,
  RegisterData,
} from "../types";
import { authService } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("app_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Błąd podczas odczytu użytkownika z localStorage", error);
        localStorage.removeItem("app_user");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
      localStorage.setItem("app_user", JSON.stringify(userData));
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Błąd logowania";
        throw new Error(message);
      }
      throw new Error("Wystąpił nieoczekiwany błąd");
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const userData = await authService.register(data);
      setUser(userData);
      localStorage.setItem("app_user", JSON.stringify(userData));
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Błąd rejestracji";
        throw new Error(message);
      }
      throw new Error("Wystąpił nieoczekiwany błąd");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("app_user");
  }, []);

  const isAdmin = useMemo(() => user?.role === "ADMIN", [user]);

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      login,
      register,
      logout,
    }),
    [user, isAdmin, login, register, logout]
  );

  if (loading) {
    return <div>Inicjalizacja systemu...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
