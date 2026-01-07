import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UniversalButton } from "../components/common/universalButton/UniversalButton";
import { isAxiosError } from "axios";
import type { UserRole } from "../types";

interface RegisterErrors {
  username?: string;
  email?: string;
  password?: string;
  server?: string;
}

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER" as UserRole,
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: RegisterErrors = {};

    if (formData.username.length < 3) {
      newErrors.username = "Nazwa użytkownika musi mieć min. 3 znaki.";
    }
    if (!formData.email.includes("@") || formData.email.length < 5) {
      newErrors.email = "Wpisz poprawny adres e-mail.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      await register(formData);
      navigate("/");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setErrors({
          server: err.response?.data?.message || "Rejestracja nieudana.",
        });
      } else {
        setErrors({ server: "Wystąpił nieoczekiwany błąd." });
      }
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: hasError ? "2px solid #dc3545" : "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box" as const,
  });

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "60px auto",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        Stwórz konto
      </h2>

      {errors.server && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "4px",
            marginBottom: "15px",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          {errors.server}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Nazwa użytkownika:
          </label>
          <input
            type="text"
            style={inputStyle(!!errors.username)}
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {errors.username && (
            <small style={{ color: "#dc3545" }}>{errors.username}</small>
          )}
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Email:
          </label>
          <input
            type="text"
            style={inputStyle(!!errors.email)}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <small style={{ color: "#dc3545" }}>{errors.email}</small>
          )}
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Hasło:
          </label>
          <input
            type="password"
            style={inputStyle(!!errors.password)}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <small style={{ color: "#dc3545" }}>{errors.password}</small>
          )}
        </div>

        <UniversalButton
          variant="primary"
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Zarejestruj się
        </UniversalButton>

        <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
          Masz już konto?{" "}
          <Link
            to="/login"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Zaloguj się
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
