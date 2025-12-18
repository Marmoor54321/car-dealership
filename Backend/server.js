import express from "express";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
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
      spalanie: 5.2,
      moc: 122,
    },
    historiaSerwisowa: [
      { opis: "Wymiana oleju", data: "2023-01-15" },
      { opis: "Wymiana klocków", data: "2023-06-20" },
    ],
  },
];

app.get("/", (req, res) => {
  res.send("Strona salonu samochodowego.");
});

app.get("/api/cars", (req, res) => {
  res.json(cars);
});

app.get("/api/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const car = cars.find((c) => c.id === carId);
  res.json(car);
});

app.post("/api/cars", (req, res) => {
  const newCarData = req.body;
  const nextId = cars.length > 0 ? Math.max(...cars.map((c) => c.id)) + 1 : 1;

  const newCar = {
    id: nextId,
    marka: newCarData.marka,
    model: newCarData.model,
    cena: Number(newCarData.cena),
    rokProdukcji: Number(newCarData.rokProdukcji),
    dostepny: newCarData.dostepny,

    daneTechniczne: {
      silnik: newCarData.daneTechniczne.silnik,
      moc: Number(newCarData.daneTechniczne.moc),
      spalanie: Number(newCarData.daneTechniczne.spalanie),
    },

    historiaSerwisowa: [],
  };

  cars.push(newCar);
  res.status(201).json(newCar);
});

app.put("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const index = cars.findIndex((car) => car.id === id);

  if (index !== -1) {
    const updatedCar = {
      id: id,
      marka: updatedData.marka,
      model: updatedData.model,
      cena: parseInt(updatedData.cena),
      rokProdukcji: parseInt(updatedData.rokProdukcji),
      dostepny: updatedData.dostepny,
      daneTechniczne: {
        silnik: updatedData.daneTechniczne.silnik,
        moc: parseInt(updatedData.daneTechniczne.moc),
        spalanie: parseInt(updatedData.daneTechniczne.spalanie),
      },
      historiaSerwisowa: cars[index].historiaSerwisowa,
    };

    cars[index] = updatedCar;
    res.json(updatedCar);
  } else {
    res.status(404).json({ message: "Nie znaleziono auta do edycji" });
  }
});

app.delete("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);

  cars = cars.filter((car) => car.id !== id);
  res.json({ message: "Auto zostało usunięte", id: id });
});

app.listen(8000, () => {
  console.log("Server started");
});
