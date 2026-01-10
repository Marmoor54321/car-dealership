import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCarContext } from "../../../context/CarContext";
import "./PageHeader.css";

const PageHeader: React.FC = () => {
  const { user, logout } = useAuth();

  const { state } = useCarContext();
  const favoritesCount = state.favorites.length;

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <span className="logo-icon">🚗</span>
            <span className="logo-text">AutoDealer</span>
          </Link>
        </div>

        <ul className="nav-links">
          {user?.role === "USER" && (
            <li>
              <Link to="/favorites" className="favorites-nav">
                ❤️ Ulubione ({state.favorites.length})
              </Link>
            </li>
          )}

          {user?.role === "ADMIN" && (
            <li>
              <Link to="/manage" className="nav-link admin-link">
                Panel Zarządzania
              </Link>
            </li>
          )}

          {user ? (
            <li>
              <button onClick={logout} className="logout-button">
                Wyloguj ({user.email})
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="login-link-btn">
                Zaloguj się
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default PageHeader;
