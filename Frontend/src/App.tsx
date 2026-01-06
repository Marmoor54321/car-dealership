import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import CarForm from "./pages/CarForm";
import NotFound from "./pages/NotFound";
import CarManagement from "./pages/CarManagement";
import { RoleGuard } from "./components/common/roleGuard/RoleGuard";
import { ProtectedRoute } from "./components/common/protectedRoute/ProtectedRoute";

function App() {
  const { user, login, logout } = useAuth();

  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "15px 20px",
          background: "#f8f9fa",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Lista Aut
          </Link>

          <RoleGuard allowedRoles={["ADMIN"]}>
            <Link
              to="/manage"
              style={{
                textDecoration: "none",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Panel zarządzania autami
            </Link>
          </RoleGuard>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {user ? (
            <>
              <span style={{ fontSize: "0.9rem", color: "#555" }}>
                Zalogowany jako: <strong>{user.email}</strong> ({user.role})
              </span>
              <button
                onClick={logout}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  border: "1px solid #dc3545",
                  color: "#dc3545",
                  background: "none",
                }}
              >
                Wyloguj
              </button>
            </>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => login("USER")}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  border: "1px solid #007bff",
                  color: "#007bff",
                  background: "none",
                }}
              >
                Test: Zaloguj User
              </button>
              <button
                onClick={() => login("ADMIN")}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  border: "1px solid #ffc107",
                  color: "#856404",
                  background: "none",
                }}
              >
                Test: Zaloguj Admin
              </button>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/manage"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CarManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CarForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CarForm />
            </ProtectedRoute>
          }
        />

        <Route path="/details/:id" element={<CarDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
