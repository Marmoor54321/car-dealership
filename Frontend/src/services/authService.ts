import axios from "axios";
import type { LoginCredentials, RegisterData, User } from "../types";

const API_URL = "http://localhost:3000/api/auth";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  },
};
