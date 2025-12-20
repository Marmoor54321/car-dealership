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
  id: number;
  marka: string;
  model: string;
  cena: number;
  rokProdukcji: number;
  dostepny: boolean;
  daneTechniczne: TechnicalData;
  historiaSerwisowa: ServiceEntry[];
}

export type Action =
  | { type: 'SET_CARS'; payload: Car[] }
  | { type: 'ADD_CAR'; payload: Car }
  | { type: 'UPDATE_CAR'; payload: Car }
  | { type: 'DELETE_CAR'; payload: number }
  | { type: 'TOGGLE_FAVORITE'; payload: Car }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

export interface CarState {
  cars: Car[];
  favorites: Car[];
  loading: boolean;
  error: string | null;
}