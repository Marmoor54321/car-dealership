import React, { createContext, useReducer, useContext } from "react";
import type { ReactNode } from "react";
import type { Car, CarState, Action } from "../types";

const initialState: CarState = {
  cars: [],
  favorites: [],
  loading: false,
  error: null,
};

const carReducer = (state: CarState, action: Action): CarState => {
  switch (action.type) {
    case "SET_CARS":
      return { ...state, cars: action.payload, loading: false };
    case "ADD_CAR":
      return { ...state, cars: [...state.cars, action.payload] };
    case "UPDATE_CAR":
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.id === action.payload.id ? action.payload : car
        ),
      };
    case "DELETE_CAR":
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
      };
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.find((c) => c.id === action.payload.id);
      let newFavs;
      if (exists) {
        newFavs = state.favorites.filter((c) => c.id !== action.payload.id);
      } else {
        newFavs = [...state.favorites, action.payload];
      }
      return { ...state, favorites: newFavs };
    }
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

interface CarContextType {
  state: CarState;
  getCars: () => Promise<void>;
  addCar: (car: Omit<Car, "id">) => Promise<void>;
  updateCar: (id: number, car: Partial<Car>) => Promise<void>;
  deleteCar: (id: number) => Promise<void>;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(carReducer, initialState);
  const API_URL = "http://localhost:3000/api/cars";

  const getCars = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      dispatch({ type: "SET_CARS", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Błąd pobierania danych" });
    }
  };

  const addCar = async (carData: Omit<Car, "id">) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
      const newCar = await res.json();
      dispatch({ type: "ADD_CAR", payload: newCar });
    } catch (err) {
      console.error("Błąd dodawania:", err);
    }
  };

  const updateCar = async (id: number, carData: Partial<Car>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
      const updatedCar = await res.json();
      dispatch({ type: "UPDATE_CAR", payload: updatedCar });
    } catch (err) {
      console.error("Błąd edycji:", err);
    }
  };

  const deleteCar = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      dispatch({ type: "DELETE_CAR", payload: id });
    } catch (err) {
      console.error("Błąd usuwania:", err);
    }
  };

  return (
    <CarContext.Provider
      value={{ state, getCars, addCar, updateCar, deleteCar }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCarContext must be used within a CarProvider");
  }
  return context;
};
