import { Navigate } from "react-router-dom";
import type { UserRole } from "../../../types";
import type { JSX } from "react/jsx-dev-runtime";
import { useAuth } from "../../../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: UserRole[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
