import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { carService } from "../../services/carService";
import type { Car, Offer } from "../../types";
import { StatusBadge } from "../../components/common/statusBadge/StatusBadge";
import { UniversalButton } from "../../components/common/universalButton/UniversalButton";
import "./CarDetails.css";
import { useCarContext } from "../../context/CarContext";
import { OfferForm } from "../offerForm/OfferForm";

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { state, dispatch } = useCarContext();
  const { user } = state;

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

  const handleOfferSubmit = (offerData: Omit<Offer, "id" | "dataZlozenia">) => {
    const finalOffer: Offer = {
      ...offerData,
      id: Date.now().toString(),
      dataZlozenia: new Date().toISOString(),
    };

    dispatch({ type: "ADD_OFFER", payload: finalOffer });
    setIsModalOpen(false);
    alert("Twoja oferta została przesłana pomyślnie!");
  };

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

          <div className="offer-actions-container">
            {!car.dostepny ? (
              <div className="not-available-banner">
                Ten pojazd nie jest już dostępny w ofercie.
              </div>
            ) : user?.role === "USER" ? (
              <UniversalButton
                onClick={() => setIsModalOpen(true)}
                variant="primary"
              >
                Złóż ofertę zakupu
              </UniversalButton>
            ) : !user ? (
              <div className="login-prompt-box">
                <p>Zaloguj się, aby złożyć ofertę.</p>
                <UniversalButton
                  onClick={() => navigate("/login")}
                  variant="secondary"
                >
                  Przejdź do logowania
                </UniversalButton>
              </div>
            ) : (
              <p className="admin-preview-text">
                Tryb podglądu administratora.
              </p>
            )}
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
          <ul className="specs-list">
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

      {isModalOpen && (
        <OfferForm
          carId={car.id}
          carName={`${car.marka} ${car.model}`}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleOfferSubmit}
        />
      )}
    </div>
  );
};

export default CarDetails;
