import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCarContext } from "../../../context/CarContext";
import "./PageHeader.css";

const PageHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { state } = useCarContext();

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <span className="logo-icon">🚗</span>
            <span className="logo-text">AutoDealer</span>
          </Link>
        </div>

        <ul className="nav-links">
          {user?.role === "USER" && (
            <li>
              <Link to="/favorites" className="favorites-nav">
                <span className="nav-icon">❤️</span>
                Ulubione ({state.favorites.length})
              </Link>
            </li>
          )}

          {user?.role === "ADMIN" && (
            <li>
              <Link to="/manage" className="nav-link admin-link">
                <span className="nav-icon">⚙️</span>
                Panel Zarządzania
              </Link>
            </li>
          )}

          <li className="auth-item">
            {user ? (
              <div className="user-info">
                <span className="user-email">{user.email}</span>
                <button onClick={logout} className="logout-button">
                  Wyloguj
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-link-btn">
                Zaloguj się
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PageHeader;
