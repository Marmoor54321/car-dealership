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
  dispatch: React.Dispatch<Action>;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(carReducer, initialState);

  return (
    <CarContext.Provider value={{ state, dispatch }}>
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
