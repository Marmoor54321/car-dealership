import React from "react";
import "./UniversalButton.css";

interface UniversalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const UniversalButton = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}: UniversalButtonProps) => {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
