import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarContext } from "../context/CarContext";

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, addCar, updateCar } = useCarContext();

  const isEditMode = Boolean(id);

  const existingCar = state.cars.find((c) => c.id === Number(id));

  const [formData, setFormData] = useState({
    marka: "",
    model: "",
    cena: 0,
    rokProdukcji: new Date().getFullYear(),
    dostepny: true,
  });

  useEffect(() => {
    if (isEditMode && existingCar) {
      setFormData({
        marka: existingCar.marka,
        model: existingCar.model,
        cena: existingCar.cena,
        rokProdukcji: existingCar.rokProdukcji,
        dostepny: existingCar.dostepny,
      });
    }
  }, [isEditMode, existingCar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && id) {
      await updateCar(Number(id), formData);
    } else {
      await addCar(formData);
    }
    navigate("/manage");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>{isEditMode ? "Edytuj Dane Pojazdu" : "Dodaj Nowy Pojazd"}</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Marka:
          </label>
          <input
            type="text"
            required
            style={{ width: "100%", padding: "8px" }}
            value={formData.marka}
            onChange={(e) =>
              setFormData({ ...formData, marka: e.target.value })
            }
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Model:
          </label>
          <input
            type="text"
            required
            style={{ width: "100%", padding: "8px" }}
            value={formData.model}
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Cena (PLN):
          </label>
          <input
            type="number"
            required
            style={{ width: "100%", padding: "8px" }}
            value={formData.cena}
            onChange={(e) =>
              setFormData({ ...formData, cena: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Rok Produkcji:
          </label>
          <input
            type="number"
            required
            style={{ width: "100%", padding: "8px" }}
            value={formData.rokProdukcji}
            onChange={(e) =>
              setFormData({ ...formData, rokProdukcji: Number(e.target.value) })
            }
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            id="dostepny"
            checked={formData.dostepny}
            onChange={(e) =>
              setFormData({ ...formData, dostepny: e.target.checked })
            }
          />
          <label htmlFor="dostepny">Pojazd dostępny w ofercie</label>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            {isEditMode ? "Zapisz Zmiany" : "Dodaj do Systemu"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/manage")}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
