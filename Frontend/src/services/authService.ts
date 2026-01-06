// src/services/authService.ts
import axios from "axios";
import type { User, UserRole } from "../types";

const API_URL = "http://localhost:3000/api/auth";

export const authService = {
  login: async (email: string, role: UserRole): Promise<User> => {
    return {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      email: email,
      role: role,
    };
  },

  checkMe: async (): Promise<User | null> => {
    return null;
  },
};
