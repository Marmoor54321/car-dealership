import { Link } from "react-router-dom";
import type { Car } from "../../types";
import { StatusBadge } from "../common/statusBadge/StatusBadge";
import { UniversalButton } from "../common/universalButton/UniversalButton";
import { useCarContext } from "../../context/CarContext";
import { useAuth } from "../../context/AuthContext";
import "./CarCard.css";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const { state, dispatch } = useCarContext();
  const { user } = useAuth();

  const isFavorite = state.favorites.includes(car.id);
  const canSeeFavorites = user && user.role === "USER";
  const handleToggleFavorite = () => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: car.id });
  };

  return (
    <div className="car-card">
      {canSeeFavorites && (
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      )}

      <div className="car-image-placeholder">
        <img
          src={car.image}
          alt={`${car.marka} ${car.model}`}
          className="car-card-img"
        />
      </div>
      <div className="car-content">
        <div className="car-header">
          <h3>
            {car.marka} {car.model}
          </h3>
          <StatusBadge dostepny={car.dostepny} />
        </div>
        <p className="car-year">Rocznik: {car.rokProdukcji}</p>
        <p className="car-price">{car.cena.toLocaleString()} PLN</p>

        <div className="car-actions">
          <Link to={`/details/${car.id}`}>
            <UniversalButton variant="primary">Szczegóły</UniversalButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
