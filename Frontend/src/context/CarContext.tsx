import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type { Car, CarState, Action } from "../types";
import { carService } from "../services/carService";

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
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((c) => c.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
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
  dispatch: React.Dispatch<Action>;
  getCars: () => Promise<void>;
  addCar: (car: Omit<Car, "id">) => Promise<void>;
  updateCar: (id: string, car: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(carReducer, initialState);

  const getCars = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await carService.getAllCars();
      dispatch({ type: "SET_CARS", payload: res.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Błąd pobierania danych" });
    }
  }, []);

  const addCar = useCallback(async (carData: Omit<Car, "id">) => {
    try {
      const res = await carService.addCar(carData);
      dispatch({ type: "ADD_CAR", payload: res.data });
    } catch (err) {
      console.error("Błąd dodawania:", err);
    }
  }, []);

  const updateCar = useCallback(async (id: string, carData: Partial<Car>) => {
    try {
      const res = await carService.updateCar(id, carData);
      dispatch({ type: "UPDATE_CAR", payload: res.data });
    } catch (err) {
      console.error("Błąd edycji:", err);
    }
  }, []);

  const deleteCar = useCallback(async (id: string) => {
    try {
      await carService.deleteCar(id);
      dispatch({ type: "DELETE_CAR", payload: id });
    } catch (err) {
      console.error("Błąd usuwania:", err);
    }
  }, []);

  return (
    <CarContext.Provider
      value={{ state, getCars, addCar, updateCar, deleteCar, dispatch }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context)
    throw new Error("useCarContext must be used within a CarProvider");
  return context;
};
