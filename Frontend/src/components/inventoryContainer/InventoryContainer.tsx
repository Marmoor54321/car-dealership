import { useEffect, useState } from "react";
import axios from "axios";
import { useCarContext } from "../../context/CarContext";
import { CarCard } from "../carCard/CarCard";
import { UniversalButton } from "../common/universalButton/UniversalButton";
import "./InventoryContainer.css";
import { PaginationControl } from "../paginationControl/PaginationControl";
import { FilterPanel } from "../filterPanel/FilterPanel";
export const InventoryContainer = () => {
  const { state, dispatch } = useCarContext();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchCars = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await axios.get("http://localhost:3000/api/cars");
        dispatch({ type: "SET_CARS", payload: response.data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Błąd pobierania danych" });
      }
    };
    fetchCars();
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOption]);

  const processCars = () => {
    let result = [...state.cars];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.marka.toLowerCase().includes(lowerQuery) ||
          car.model.toLowerCase().includes(lowerQuery)
      );
    }

    if (sortOption) {
      result.sort((a, b) => {
        switch (sortOption) {
          case "price_asc":
            return a.cena - b.cena;
          case "price_desc":
            return b.cena - a.cena;
          case "year_asc":
            return a.rokProdukcji - b.rokProdukcji;
          case "year_desc":
            return b.rokProdukcji - a.rokProdukcji;
          default:
            return 0;
        }
      });
    }

    return result;
  };

  const filteredSortedCars = processCars();

  const totalPages = Math.ceil(filteredSortedCars.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = filteredSortedCars.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (state.loading)
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Ładowanie oferty...
      </div>
    );
  if (state.error)
    return (
      <div style={{ color: "red", textAlign: "center" }}>{state.error}</div>
    );

  return (
    <div className="inventory-container">
      <h2>Nasza Oferta</h2>

      <FilterPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      <div
        className="inventory-controls"
        style={{ justifyContent: "flex-end", marginBottom: "10px" }}
      >
        <UniversalButton
          onClick={() =>
            setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
          }
          variant="secondary"
        >
          Widok: {viewMode === "grid" ? "Siatka" : "Lista"}
        </UniversalButton>
      </div>

      {currentCars.length > 0 ? (
        <div
          className={`cars-layout ${
            viewMode === "grid" ? "grid-view" : "list-view"
          }`}
        >
          {currentCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Nie znaleziono samochodów spełniających kryteria.
        </p>
      )}

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
