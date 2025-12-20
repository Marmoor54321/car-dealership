import { Link } from "react-router-dom";
import type { Car } from "../../types";
import { StatusBadge } from "../common/statusBadge/StatusBadge";
import { UniversalButton } from "../common/universalButton/UniversalButton";
import "./CarCard.css";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="car-card">
      <div className="car-image-placeholder">
        <img
          src={`https://placehold.co/600x400?text=${car.marka}+${car.model}`}
          alt={`${car.marka} ${car.model}`}
        />
      </div>
      <div className="car-content">
        <div className="car-header">
          <h3>
            {car.marka} {car.model}
          </h3>
          <StatusBadge isAvailable={car.dostepny} />
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
