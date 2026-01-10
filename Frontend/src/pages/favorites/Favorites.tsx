import { Link } from "react-router-dom";
import { CarCard } from "../../components/carCard/CarCard";
import { useCarContext } from "../../context/CarContext";
import "./Favorites.css";

export const Favorites = () => {
  const { state } = useCarContext();

  const favoriteCars = state.cars.filter((car) =>
    state.favorites.includes(car.id)
  );

  return (
    <div className="favorites-page">
      <h1>Twoje Ulubione Samochody</h1>

      {favoriteCars.length === 0 ? (
        <div className="empty-state">
          <p>
            Nie masz jeszcze żadnych ulubionych aut. Wróć do katalogu i dodaj
            coś! 🚗
          </p>
          <Link to="/" className="empty-state-link">
            Przeglądaj samochody
          </Link>
        </div>
      ) : (
        <div className="cars-grid">
          {favoriteCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};
