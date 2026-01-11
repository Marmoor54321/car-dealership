import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAxiosError } from "axios";
import "./Register.css";
import { UniversalButton } from "../../components/common/universalButton/UniversalButton";
import { useAuth } from "../../context/AuthContext";

type UserRole = "USER" | "ADMIN";
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
        if (err.response) {
          setErrors({
            server:
              err.response.data?.message ||
              "Użytkownik o tym adresie e-mail jest już zarejestrowany.",
          });
        } else {
          setErrors({ server: "Błąd połączenia z serwerem. Spróbuj później." });
        }
      } else {
        setErrors({
          server: "Użytkownik o tym adresie e-mail jest już zarejestrowany.",
        });
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Stwórz konto</h2>

      {errors.server && <div className="server-error">{errors.server}</div>}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Nazwa użytkownika:</label>
          <input
            type="text"
            className={`register-input ${errors.username ? "input-error" : ""}`}
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {errors.username && (
            <small className="error-text">{errors.username}</small>
          )}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className={`register-input ${errors.email ? "input-error" : ""}`}
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
            className={`register-input ${errors.password ? "input-error" : ""}`}
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
          Zarejestruj się
        </UniversalButton>

        <p className="login-link">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
