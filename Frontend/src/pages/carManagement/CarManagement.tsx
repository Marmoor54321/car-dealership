import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CarManagement.css";
import { UniversalButton } from "../../components/common/universalButton/UniversalButton";
import { useCarContext } from "../../context/CarContext";

const CarManagement: React.FC = () => {
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
    <div className="management-container">
      <div className="management-header">
        <h2>Panel Zarządzania Flotą</h2>
        <UniversalButton variant="primary" onClick={() => navigate("/add")}>
          + Dodaj Nowe Auto
        </UniversalButton>
      </div>

      <div className="table-wrapper">
        <table className="management-table">
          <thead>
            <tr>
              <th>Pojazd</th>
              <th>Cena</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {state.cars.map((car) => (
              <tr key={car.id}>
                <td>
                  <div className="car-main-info">
                    {car.marka} {car.model}
                  </div>
                  <div className="car-sub-info">Rok: {car.rokProdukcji}</div>
                </td>
                <td>{car.cena.toLocaleString()} PLN</td>
                <td>
                  <span
                    className={`status-badge ${
                      car.dostepny ? "status-available" : "status-sold"
                    }`}
                  >
                    {car.dostepny ? "Dostępny" : "Sprzedany"}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
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
