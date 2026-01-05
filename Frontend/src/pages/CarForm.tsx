import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarContext } from "../context/CarContext";
import { UniversalButton } from "../components/common/universalButton/UniversalButton";
import type { Car } from "../types";

const CarForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, addCar, updateCar, getCars } = useCarContext();

  const isEditMode = Boolean(id);

  const existingCar = state.cars.find((c) => String(c.id) === String(id));

  const [formData, setFormData] = useState<Omit<Car, "id">>({
    marka: "",
    model: "",
    cena: 0,
    rokProdukcji: new Date().getFullYear(),
    dostepny: true,
    daneTechniczne: {
      silnik: "",
      moc: 0,
      spalanie: 0,
    },
    historiaSerwisowa: [],
  });

  useEffect(() => {
    if (isEditMode && state.cars.length === 0) {
      getCars();
    }
  }, [isEditMode, state.cars.length, getCars]);

  useEffect(() => {
    if (isEditMode && existingCar) {
      setFormData({
        marka: existingCar.marka,
        model: existingCar.model,
        cena: existingCar.cena,
        rokProdukcji: existingCar.rokProdukcji,
        dostepny: existingCar.dostepny,
        daneTechniczne: existingCar.daneTechniczne
          ? { ...existingCar.daneTechniczne }
          : { silnik: "", moc: 0, spalanie: 0 },
        historiaSerwisowa: existingCar.historiaSerwisowa
          ? [...existingCar.historiaSerwisowa]
          : [],
      });
    }
  }, [isEditMode, existingCar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && id) {
      await updateCar(id, formData);
    } else {
      await addCar(formData);
    }
    navigate("/manage");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "40px auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        {isEditMode ? "Edytuj Dane Pojazdu" : "Dodaj Nowy Pojazd"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div className="form-group">
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Marka:
          </label>
          <input
            type="text"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            value={formData.marka}
            onChange={(e) =>
              setFormData({ ...formData, marka: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Model:
          </label>
          <input
            type="text"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            value={formData.model}
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
          />
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Cena (PLN):
            </label>
            <input
              type="number"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              value={formData.cena}
              onChange={(e) =>
                setFormData({ ...formData, cena: Number(e.target.value) })
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Rok Produkcji:
            </label>
            <input
              type="number"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              value={formData.rokProdukcji}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rokProdukcji: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "10px 0",
          }}
        >
          <input
            type="checkbox"
            id="dostepny"
            style={{ width: "18px", height: "18px" }}
            checked={formData.dostepny}
            onChange={(e) =>
              setFormData({ ...formData, dostepny: e.target.checked })
            }
          />
          <label htmlFor="dostepny" style={{ cursor: "pointer" }}>
            Pojazd dostępny w ofercie
          </label>
        </div>

        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          <UniversalButton type="submit" variant="primary">
            {isEditMode ? "Zapisz Zmiany" : "Dodaj do Systemu"}
          </UniversalButton>

          <UniversalButton
            type="button"
            variant="secondary"
            onClick={() => navigate("/manage")}
          >
            Anuluj
          </UniversalButton>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
