import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import type { Car } from "./Models/Car";

function App() {
  const [cars, setCars] = useState<Car[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    marka: "",
    model: "",
    cena: "",
    rokProdukcji: "",
    dostepny: true,
    silnik: "",
    moc: "",
    spalanie: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  const handleEditClick = (car: Car) => {
    setEditingId(car.id);
    setFormData({
      marka: car.marka,
      model: car.model,
      cena: String(car.cena),
      rokProdukcji: String(car.rokProdukcji),
      dostepny: car.dostepny,
      silnik: car.daneTechniczne.silnik,
      moc: String(car.daneTechniczne.moc),
      spalanie: String(car.daneTechniczne.spalanie),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      marka: "",
      model: "",
      cena: "",
      rokProdukcji: "",
      dostepny: true,
      silnik: "",
      moc: "",
      spalanie: "",
    });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Usunąć auto?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/cars/${id}`);
      fetchData();
    } catch (error) {
      alert("Błąd usuwania.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      marka: formData.marka,
      model: formData.model,
      cena: Number(formData.cena),
      rokProdukcji: Number(formData.rokProdukcji),
      dostepny: formData.dostepny,
      daneTechniczne: {
        silnik: formData.silnik,
        moc: Number(formData.moc),
        spalanie: Number(formData.spalanie),
      },
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/cars/${editingId}`, payload);
        alert("Zaktualizowano dane auta!");
      } else {
        await axios.post("http://localhost:8000/api/cars", {
          ...payload,
          historiaSerwisowa: [],
        });
        alert("Dodano nowe auto!");
      }

      handleCancelEdit();
      fetchData();
    } catch (error) {
      console.error("Błąd wysyłania:", error);
      alert("Wystąpił błąd.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Panel Zarządzania Salonem</h1>

      <div
        style={{
          background: editingId ? "#e3f2fd" : "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          border: editingId ? "2px solid #2196F3" : "1px solid #dee2e6",
        }}
      >
        <h3>{editingId ? "Edytuj dane samochodu" : "Dodaj nowy pojazd"}</h3>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              name="marka"
              placeholder="Marka"
              value={formData.marka}
              onChange={handleChange}
              required
            />
            <input
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              required
            />
            <input
              name="cena"
              type="number"
              placeholder="Cena"
              value={formData.cena}
              onChange={handleChange}
              required
            />
            <input
              name="rokProdukcji"
              type="number"
              placeholder="Rok"
              value={formData.rokProdukcji}
              onChange={handleChange}
              required
            />
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <input
                type="checkbox"
                name="dostepny"
                checked={formData.dostepny}
                onChange={handleChange}
              />
              Dostępny do sprzedaży
            </label>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              name="silnik"
              placeholder="Silnik"
              value={formData.silnik}
              onChange={handleChange}
              required
            />
            <input
              name="moc"
              type="number"
              placeholder="Moc (KM)"
              value={formData.moc}
              onChange={handleChange}
              required
            />
            <input
              name="spalanie"
              type="number"
              step="0.1"
              placeholder="Spalanie"
              value={formData.spalanie}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: editingId ? "#2196F3" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {editingId ? "Zapisz zmiany" : "Dodaj auto"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Anuluj
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {cars.map((car) => (
          <div
            key={car.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              backgroundColor: car.dostepny ? "#fff" : "#f0f0f0",
              position: "relative",
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              {car.marka} {car.model}
            </h2>

            <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              {car.cena} PLN
            </p>
            <p>
              Rok: {car.rokProdukcji} | {car.daneTechniczne.moc} KM
            </p>

            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEditClick(car)}
                style={{
                  flex: 1,
                  padding: "5px",
                  backgroundColor: "#ffc107",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edytuj
              </button>

              <button
                onClick={() => handleDelete(car.id)}
                style={{
                  flex: 1,
                  padding: "5px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
