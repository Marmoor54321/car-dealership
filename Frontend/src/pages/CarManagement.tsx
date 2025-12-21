import React, { useEffect } from "react";
import { useCarContext } from "../context/CarContext";
import { useNavigate } from "react-router-dom";

const CarManagement = () => {
  const { state, getCars, deleteCar } = useCarContext();
  const navigate = useNavigate();

  useEffect(() => {
    getCars();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) {
      deleteCar(id);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Zarządzanie Autami</h2>
        <button
          onClick={() => navigate("/add")}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          + Dodaj Nowe Auto
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "12px" }}>Auto</th>
            <th style={{ padding: "12px" }}>Cena</th>
            <th style={{ padding: "12px" }}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {state.cars.map((car) => (
            <tr key={car.id} style={{ borderBottom: "1px solid #dee2e6" }}>
              <td style={{ padding: "12px" }}>
                {car.marka} {car.model} ({car.rokProdukcji})
              </td>
              <td style={{ padding: "12px" }}>
                {car.cena.toLocaleString()} PLN
              </td>
              <td style={{ padding: "12px" }}>
                <button
                  onClick={() => navigate(`/edit/${car.id}`)}
                  style={{ marginRight: "8px", padding: "5px 10px" }}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  style={{
                    color: "white",
                    backgroundColor: "#dc3545",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarManagement;
