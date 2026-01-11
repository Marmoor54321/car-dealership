import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAxiosError } from "axios";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";
import { UniversalButton } from "../../components/common/universalButton/UniversalButton";
import { useCarContext } from "../../context/CarContext";
import type { UserRole } from "../../types";

interface LoginErrors {
  email?: string;
  password?: string;
  server?: string;
}

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});

  const { login } = useAuth();
  const { dispatch } = useCarContext();
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

      const userRole: UserRole = formData.email.includes("admin")
        ? "ADMIN"
        : "USER";

      const loggedUser = {
        id: Date.now().toString(),
        email: formData.email,
        role: userRole,
      };

      localStorage.setItem("user", JSON.stringify(loggedUser));

      dispatch({
        type: "SET_USER",
        payload: loggedUser,
      });

      navigate("/");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response) {
          setErrors({ server: "Podaj poprawny email i haslo." });
        } else {
          setErrors({ server: "Błąd połączenia z serwerem. Spróbuj później." });
        }
      } else {
        setErrors({ server: "Podaj poprawny email i haslo." });
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Zaloguj się</h2>

      {errors.server && <div className="server-error">{errors.server}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className={`login-input ${errors.email ? "input-error" : ""}`}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>Hasło:</label>
          <input
            type="password"
            className={`login-input ${errors.password ? "input-error" : ""}`}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <small className="error-text">{errors.password}</small>
          )}
        </div>

        <UniversalButton variant="primary" type="submit">
          Zaloguj
        </UniversalButton>

        <p className="register-link">
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
