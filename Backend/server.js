import express from "express";
import cors from "cors";
const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions));

app.get("/", (req,res) => {
res.json({
    carInfo: [
        {
            title: "BMW M3",
            description: "A high-performance version of the BMW 3 Series, known for its powerful engine and sporty handling.",
            price: 69999,
        },
        {
            title: "Audi RS5",
            description: "A luxury sports car that combines elegant design with impressive performance and advanced technology.",
            price: 72999,
        }
    ]
})
})

app.get("api/cars", (req, res) => {
    res.json(cars);
})
app.get("api/cars/:id", (req, res) => {
    const carId = parseInt(req.params.id);
    const car = cars.find(c => c.id === carId);
    res.json(car);
})
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
      moc: 122
    },
    historiaSerwisowa: [
      { opis: "Wymiana oleju", data: "2023-01-15" },
      { opis: "Wymiana klocków", data: "2023-06-20" }
    ]
  },
];

app.listen(8000, () => {
    console.log("server started")
})