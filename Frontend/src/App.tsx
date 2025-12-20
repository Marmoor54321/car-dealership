import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import CarForm from "./pages/CarForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{ padding: "10px", background: "#eee", marginBottom: "20px" }}
      >
        <Link to="/" style={{ marginRight: "10px" }}>
          Lista Aut
        </Link>
        <Link to="/add">Dodaj Auto</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/add" element={<CarForm />} />

        <Route path="/edit/:id" element={<CarForm />} />

        <Route path="/details/:id" element={<CarDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
