import axios from "axios";
import type { Car } from "../types";

const API_URL = "http://localhost:3000/api/cars";

export const carService = {
  getAllCars: () => {
    return axios.get<Car[]>(API_URL);
  },

  getCarById: (id: string) => {
    return axios.get<Car>(`${API_URL}/${id}`);
  },

  addCar: (carData: Omit<Car, "id">) => {
    return axios.post<Car>(API_URL, carData);
  },

  updateCar: (id: string, carData: Partial<Car>) => {
    return axios.put<Car>(`${API_URL}/${id}`, carData);
  },

  deleteCar: (id: string) => {
    return axios.delete(`${API_URL}/${id}`);
  },
};
