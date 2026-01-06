import { useEffect } from "react";
import { useCarContext } from "../context/CarContext";
import { useNavigate } from "react-router-dom";
import { UniversalButton } from "../components/common/universalButton/UniversalButton";

const CarManagement = () => {
  const { state, getCars, deleteCar } = useCarContext();
  const navigate = useNavigate();

  useEffect(() => {
    getCars();
  }, [getCars]);

  const handleDelete = (id: string, carName: string) => {
    if (window.confirm(`Czy na pewno chcesz usunąć ogłoszenie: ${carName}?`)) {
      deleteCar(id);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ margin: 0 }}>Panel Zarządzania Flotą</h2>

        <UniversalButton variant="primary" onClick={() => navigate("/add")}>
          + Dodaj Nowe Auto
        </UniversalButton>
      </div>

      <div
        style={{
          overflowX: "auto",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f8f9fa",
                borderBottom: "2px solid #dee2e6",
              }}
            >
              <th style={{ padding: "16px" }}>Pojazd</th>
              <th style={{ padding: "16px" }}>Cena</th>
              <th style={{ padding: "16px" }}>Status</th>
              <th style={{ padding: "16px" }}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {state.cars.map((car) => (
              <tr key={car.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "16px" }}>
                  <div style={{ fontWeight: "bold" }}>
                    {car.marka} {car.model}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    Rok: {car.rokProdukcji}
                  </div>
                </td>
                <td style={{ padding: "16px" }}>
                  {car.cena.toLocaleString()} PLN
                </td>
                <td style={{ padding: "16px" }}>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      backgroundColor: car.dostepny ? "#e6f4ea" : "#fce8e8",
                      color: car.dostepny ? "#1e7e34" : "#c82333",
                    }}
                  >
                    {car.dostepny ? "Dostępny" : "Sprzedany"}
                  </span>
                </td>
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <UniversalButton
                      variant="secondary"
                      onClick={() => navigate(`/edit/${car.id}`)}
                    >
                      Edytuj
                    </UniversalButton>

                    <UniversalButton
                      variant="danger"
                      onClick={() =>
                        handleDelete(car.id, `${car.marka} ${car.model}`)
                      }
                    >
                      Usuń
                    </UniversalButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarManagement;
