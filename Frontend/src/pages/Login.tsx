import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UniversalButton } from "../components/common/universalButton/UniversalButton";
import { isAxiosError } from "axios";

interface LoginErrors {
  email?: string;
  password?: string;
  server?: string;
}

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: LoginErrors = {};
    if (!formData.email.includes("@"))
      newErrors.email = "Wpisz poprawny adres e-mail.";
    if (formData.password.length < 6)
      newErrors.password = "Hasło musi mieć min. 6 znaków.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      await login(formData);
      navigate("/");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setErrors({
          server:
            err.response?.data?.message || "Nieprawidłowy e-mail lub hasło",
        });
      } else {
        setErrors({ server: "Wystąpił nieoczekiwany błąd połączenia" });
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
        maxWidth: "400px",
        margin: "80px auto",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Zaloguj się</h2>

      {errors.server && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "4px",
            marginBottom: "15px",
            fontSize: "0.9rem",
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
          Zaloguj
        </UniversalButton>

        <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
          Nie masz konta?{" "}
          <Link
            to="/register"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Zarejestruj się
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
