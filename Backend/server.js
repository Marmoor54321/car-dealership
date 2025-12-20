import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let cars = [
  {
    id: 1,
    marka: "Toyota",
    model: "Corolla",
    cena: 45000,
    rokProdukcji: 2018,
    dostepny: true,
    daneTechniczne: {
      silnik: "1.8 Hybrid",
      moc: 122,
      spalanie: 5.2
    },
    historiaSerwisowa: [
      { opis: "Wymiana oleju", data: "2023-01-15" },
      { opis: "Wymiana klocków hamulcowych", data: "2023-06-20" }
    ]
  },
  {
    id: 2,
    marka: "BMW",
    model: "Seria 3",
    cena: 85000,
    rokProdukcji: 2020,
    dostepny: false,
    daneTechniczne: {
      silnik: "2.0 Diesel",
      moc: 190,
      spalanie: 6.5
    },
    historiaSerwisowa: [
      { opis: "Wymiana filtrów", data: "2024-02-10" }
    ]
  },
  {
    id: 3,
    marka: "Ford",
    model: "Focus",
    cena: 32000,
    rokProdukcji: 2016,
    dostepny: true,
    daneTechniczne: {
      silnik: "1.5 EcoBoost",
      moc: 150,
      spalanie: 7.0
    },
    historiaSerwisowa: []
  }
];

const getNextId = () => {
    const maxId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) : 0;
    return maxId + 1;
};


app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(c => c.id === id);

  if (!car) {
    return res.status(404).json({ message: "Auto nie znalezione" });
  }
  res.json(car);
});

app.post('/api/cars', (req, res) => {
  const newCar = {
    id: getNextId(),
    ...req.body
  };
  
  if(!newCar.historiaSerwisowa) newCar.historiaSerwisowa = [];
  if(!newCar.daneTechniczne) newCar.daneTechniczne = {};

  cars.push(newCar);
  res.status(201).json(newCar);
});

app.put('/api/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Auto nie znalezione" });
  }

  cars[index] = { ...cars[index], ...req.body };
  res.json(cars[index]);
});

app.delete('/api/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = cars.length;
  cars = cars.filter(c => c.id !== id);

  if (cars.length === initialLength) {
    return res.status(404).json({ message: "Auto nie znalezione" });
  }

  res.json({ message: "Auto usunięte poprawnie", id: id });
});

app.listen(PORT, () => {
  console.log(`Serwer backendu działa na porcie http://localhost:${PORT}`);

});