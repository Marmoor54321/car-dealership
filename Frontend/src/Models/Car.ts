export interface Car {
  id: number;
  marka: string;
  model: string;
  cena: number;
  rokProdukcji: number;
  dostepny: boolean;
  daneTechniczne: {
    silnik: string;
    spalanie: number;
    moc: number;
  };
  historiaSerwisowa: Array<{
    opis: string;
    data: string;
  }>;
}
