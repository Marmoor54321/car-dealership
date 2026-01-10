import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

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
    przebieg: 100000,
    rokProdukcji: 2018,
    dostepny: true,
    daneTechniczne: { silnik: "1.8 Hybrid", moc: 122, spalanie: 5.2 },
    historiaSerwisowa: [{ opis: "Wymiana oleju", data: "2023-01-15" }],
    opis: "Niezawodny i ekonomiczny sedan z napędem hybrydowym. Auto jest w bardzo dobrym stanie technicznym, z pełną historią serwisową. Idealne dla osób szukających oszczędnego i komfortowego pojazdu do codziennej jazdy.",
  },
  {
    id: 2,
    marka: "BMW",
    model: "Seria 3",
    cena: 85000,
    przebieg: 60000,
    rokProdukcji: 2020,
    dostepny: false,
    daneTechniczne: { silnik: "2.0 Diesel", moc: 190, spalanie: 6.5 },
    historiaSerwisowa: [{ opis: "Wymiana filtrów", data: "2024-02-10" }],
    opis: "Luksusowy sedan z dynamicznym silnikiem diesla. Auto jest w doskonałym stanie technicznym, z pełną historią serwisową. Idealne dla osób ceniących komfort i sportowe osiągi.",
  },
  {
    id: 3,
    marka: "Ford",
    model: "Focus",
    cena: 32000,
    przebieg: 120000,
    rokProdukcji: 2016,
    dostepny: true,
    daneTechniczne: { silnik: "1.5 EcoBoost", moc: 150, spalanie: 7.0 },
    historiaSerwisowa: [],
    opis: "Przestronny i ekonomiczny hatchback, idealny do codziennej jazdy. Auto jest w dobrym stanie technicznym, z regularnie serwisowaną historią. Doskonały wybór dla osób szukających niezawodnego pojazdu w przystępnej cenie.",
  },
  {
    id: 4,
    marka: "Chevrolet",
    model: "Trax",
    cena: 60000,
    przebieg: 80000,
    rokProdukcji: 2016,
    dostepny: true,
    daneTechniczne: { silnik: "1.4 Turbo", moc: 140, spalanie: 7.2 },
    historiaSerwisowa: [{ opis: "Przegląd rejestracyjny", data: "2024-01-10" }],
    opis: "Kompaktowy SUV z dynamicznym silnikiem turbo. Auto jest w bardzo dobrym stanie technicznym, z pełną historią serwisową. Idealne dla osób szukających wszechstronnego pojazdu do miasta i na dłuższe trasy.",
  },
  {
    id: 5,
    marka: "Opel",
    model: "Astra",
    cena: 11000,
    przebieg: 150000,
    rokProdukcji: 2003,
    dostepny: true,
    daneTechniczne: { silnik: "1.6 Benzyna", moc: 105, spalanie: 7.5 },
    historiaSerwisowa: [{ opis: "Wymiana rozrządu", data: "2022-05-12" }],
    opis: "Używane auto w dobrym stanie technicznym. Regularnie serwisowane, z wymienionym rozrządem. Idealne dla osób szukających ekonomicznego i niezawodnego pojazdu do codziennej jazdy.",
  },
  {
    id: 6,
    marka: "Mazda",
    model: "CX-5",
    cena: 92000,
    przebieg: 70000,
    rokProdukcji: 2019,
    dostepny: true,
    daneTechniczne: { silnik: "2.5 SkyActiv-G", moc: 194, spalanie: 8.0 },
    historiaSerwisowa: [],
    opis: "Przestronny SUV z dynamicznym silnikiem i nowoczesnymi technologiami. Auto jest w doskonałym stanie, z pełną historią serwisową. Idealne dla rodzin oraz osób ceniących komfort i bezpieczeństwo podczas jazdy.",
  },
  {
    id: 7,
    marka: "Audi",
    model: "A4",
    cena: 115000,
    przebieg: 50000,
    rokProdukcji: 2021,
    dostepny: true,
    daneTechniczne: { silnik: "2.0 TFSI", moc: 204, spalanie: 6.8 },
    historiaSerwisowa: [
      { opis: "Serwis A1", data: "2025-01-02" },
      { opis: "Wymiana opon", data: "2024-10-15" },
    ],
    opis: "Luksusowy sedan z zaawansowanymi technologiami i dynamicznym silnikiem. Auto jest w doskonałym stanie technicznym, z pełną historią serwisową. Idealne dla osób ceniących komfort, styl i sportowe osiągi.",
  },
  {
    id: 8,
    marka: "Mercedes",
    model: "C200",
    cena: 145000,
    przebieg: 40000,
    rokProdukcji: 2022,
    dostepny: true,
    daneTechniczne: {
      silnik: "1.5 Turbo + Mild Hybrid",
      moc: 204,
      spalanie: 6.4,
    },
    historiaSerwisowa: [],
    opis: "Ekskluzywny sedan z nowoczesnym napędem mild hybrid i zaawansowanymi technologiami. Auto jest w doskonałym stanie technicznym, z pełną historią serwisową. Idealne dla osób ceniących luksus, komfort i innowacje w motoryzacji.",
  },
  {
    id: 9,
    marka: "Volkswagen",
    model: "Golf",
    cena: 55000,
    przebieg: 90000,
    rokProdukcji: 2017,
    dostepny: true,
    daneTechniczne: { silnik: "1.4 TSI", moc: 150, spalanie: 5.8 },
    historiaSerwisowa: [{ opis: "Wymiana akumulatora", data: "2024-11-20" }],
    opis: "Popularny hatchback z dynamicznym silnikiem i nowoczesnymi technologiami. Auto jest w bardzo dobrym stanie technicznym, z pełną historią serwisową. Idealne dla osób szukających niezawodnego i wszechstronnego pojazdu do codziennej jazdy.",
  },
];

let users = [
  {
    id: "101",
    username: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "ADMIN",
  },
  {
    id: "102",
    username: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("user123", 10),
    role: "USER",
  },
];

const getNextId = () => {
  const maxId = cars.length > 0 ? Math.max(...cars.map((c) => c.id)) : 0;
  return maxId + 1;
};

app.get("/api/cars", (req, res) => res.json(cars));

app.get("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find((c) => c.id === id);
  car
    ? res.json(car)
    : res.status(404).json({ message: "Auto nie znalezione" });
});

app.post("/api/cars", (req, res) => {
  const newCar = { id: getNextId(), ...req.body };
  if (!newCar.historiaSerwisowa) newCar.historiaSerwisowa = [];
  if (!newCar.daneTechniczne) newCar.daneTechniczne = {};
  cars.push(newCar);
  res.status(201).json(newCar);
});

app.put("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex((c) => c.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Auto nie znalezione" });
  cars[index] = { ...cars[index], ...req.body };
  res.json(cars[index]);
});

app.delete("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cars = cars.filter((c) => c.id !== id);
  res.json({ message: "Auto usunięte poprawnie", id: id });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (users.find((u) => u.email === email)) {
      return res
        .status(400)
        .json({ message: "Użytkownik o tym adresie już istnieje." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      role: "USER",
    };

    users.push(newUser);
    console.log(`Zarejestrowano nowego użytkownika: ${email}`);

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas rejestracji." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Nieprawidłowy email lub hasło." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Nieprawidłowy email lub hasło." });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas logowania." });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer backendu działa na http://localhost:${PORT}`);
});
