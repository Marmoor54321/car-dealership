import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHeader from "./components/common/pageHeader/PageHeader";
import Footer from "./components/common/footer/Footer";
import Home from "./pages/Home";
import CarDetails from "./pages/carDetails/CarDetails";
import CarForm from "./pages/carForm/CarForm";
import NotFound from "./pages/NotFound";
import CarManagement from "./pages/CarManagement";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/common/protectedRoute/ProtectedRoute";
import "./App.css";
import { Favorites } from "./pages/favorites/Favorites";

function App() {
  return (
    <BrowserRouter>
      <PageHeader />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/favorites" element={<Favorites />} />

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
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
