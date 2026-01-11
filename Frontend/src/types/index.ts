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
  opis: string;
  dostepny: boolean;
  daneTechniczne: TechnicalData;
  historiaSerwisowa: ServiceEntry[];
}

export type Action =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_CARS"; payload: Car[] }
  | { type: "ADD_CAR"; payload: Car }
  | { type: "UPDATE_CAR"; payload: Car }
  | { type: "DELETE_CAR"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "ADD_OFFER"; payload: Offer };

export interface CarState {
  cars: Car[];
  favorites: string[];
  loading: boolean;
  user: User | null;
  error: string | null;
  offers: Offer[];
}

export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export type PaymentMethod = "GOTÓWKA" | "LEASING";

export interface Address {
  ulica: string;
  miasto: string;
  kodPocztowy: string;
}

export interface Offer {
  id: string;
  carId: string;
  imie: string;
  nazwisko: string;
  adres: Address;
  telefon: string;
  metodaPlatnosci: PaymentMethod;
  preferowaneMarki: string[];
  dataZlozenia: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  role: "ADMIN" | "USER";
}

export interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}
