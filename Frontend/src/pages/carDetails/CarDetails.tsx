import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { carService } from "../../services/carService";
import type { Car } from "../../types";
import { StatusBadge } from "../../components/common/statusBadge/StatusBadge";
import { UniversalButton } from "../../components/common/universalButton/UniversalButton";
import "./CarDetails.css";

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      if (id) {
        try {
          const { data } = await carService.getCarById(id);
          setCar(data);
        } catch (error) {
          console.error("Błąd podczas pobierania szczegółów auta:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCar();
  }, [id]);

  if (loading)
    return <div className="loading">Ładowanie danych technicznych...</div>;
  if (!car) return <div className="error">Nie znaleziono pojazdu.</div>;

  return (
    <div className="car-details-page">
      <div className="details-header">
        <UniversalButton onClick={() => navigate(-1)} variant="secondary">
          ← Powrót
        </UniversalButton>
        <StatusBadge dostepny={car.dostepny} />
      </div>

      <div className="details-main">
        <div className="details-info">
          <h1>
            {car.marka} {car.model}
          </h1>
          <p className="details-price">{car.cena.toLocaleString()} PLN</p>
          <div className="details-meta">
            <span>Rocznik: {car.rokProdukcji}</span>
            <br />
            <span>Przebieg: {car.przebieg.toLocaleString()} km</span>
          </div>
        </div>
      </div>

      <section className="description-section">
        <h3>Opis pojazdu</h3>
        <div className="car-description-text">
          {car.opis || "Brak opisu dla tego pojazdu."}
        </div>
      </section>

      <div className="details-grid">
        <section className="specs-section">
          <h3>Parametry techniczne</h3>
          <ul>
            <li>
              <strong>Silnik:</strong> {car.daneTechniczne.silnik}
            </li>
            <li>
              <strong>Moc:</strong> {car.daneTechniczne.moc} KM
            </li>
            <li>
              <strong>Spalanie:</strong> {car.daneTechniczne.spalanie} l/100km
            </li>
          </ul>
        </section>

        <section className="history-section">
          <h3>Historia serwisowa</h3>
          {car.historiaSerwisowa.length > 0 ? (
            <div className="history-list">
              {car.historiaSerwisowa.map((entry, index) => (
                <div key={index} className="history-item">
                  <span className="history-date">
                    {new Date(entry.data).toLocaleDateString()}
                  </span>
                  <p className="history-desc">{entry.opis}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Brak wpisów w historii.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default CarDetails;
