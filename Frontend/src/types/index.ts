export interface TechnicalData {
  silnik: string;
  moc: number;
  spalanie: number;
}

export interface ServiceEntry {
  opis: string;
  data: string;
}

export interface Car {
  id: string;
  marka: string;
  model: string;
  cena: number;
  przebieg: number;
  rokProdukcji: number;
  dostepny: boolean;
  daneTechniczne: TechnicalData;
  historiaSerwisowa: ServiceEntry[];
}

export type Action =
  | { type: "SET_CARS"; payload: Car[] }
  | { type: "ADD_CAR"; payload: Car }
  | { type: "UPDATE_CAR"; payload: Car }
  | { type: "DELETE_CAR"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: Car }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

export interface CarState {
  cars: Car[];
  favorites: Car[];
  loading: boolean;
  error: string | null;
}

export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}
