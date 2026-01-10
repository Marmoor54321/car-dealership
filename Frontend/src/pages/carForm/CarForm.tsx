import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CarForm.css";
import type { Car, ServiceEntry } from "../../types";
import { useCarContext } from "../../context/CarContext";
import { UniversalButton } from "../../components/common/universalButton/UniversalButton";

interface FormErrors {
  marka?: string;
  model?: string;
  cena?: string;
  rokProdukcji?: string;
  przebieg?: string;
  opis?: string;
  tech?: string;
}

const CarForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, addCar, updateCar, getCars } = useCarContext();

  const isEditMode = Boolean(id);
  const existingCar = state.cars.find((c) => String(c.id) === String(id));
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<Omit<Car, "id">>({
    marka: "",
    model: "",
    cena: 0,
    przebieg: 0,
    rokProdukcji: new Date().getFullYear(),
    opis: "",
    dostepny: true,
    daneTechniczne: { silnik: "", moc: 0, spalanie: 0 },
    historiaSerwisowa: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isEditMode && state.cars.length === 0) getCars();
  }, [isEditMode, state.cars.length, getCars]);

  useEffect(() => {
    if (isEditMode && existingCar) {
      setFormData({
        ...existingCar,
        daneTechniczne: { ...existingCar.daneTechniczne },
        historiaSerwisowa: [...existingCar.historiaSerwisowa],
      });
    }
  }, [isEditMode, existingCar]);

  const addServiceEntry = () => {
    setFormData({
      ...formData,
      historiaSerwisowa: [
        ...formData.historiaSerwisowa,
        { data: "", opis: "" },
      ],
    });
  };

  const updateServiceEntry = (
    index: number,
    field: keyof ServiceEntry,
    value: string
  ) => {
    const newHistory = [...formData.historiaSerwisowa];
    newHistory[index] = { ...newHistory[index], [field]: value };
    setFormData({ ...formData, historiaSerwisowa: newHistory });
  };

  const removeServiceEntry = (index: number) => {
    setFormData({
      ...formData,
      historiaSerwisowa: formData.historiaSerwisowa.filter(
        (_, i) => i !== index
      ),
    });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.marka.trim()) newErrors.marka = "Marka jest wymagana.";
    if (!formData.model.trim()) newErrors.model = "Model jest wymagany.";

    if (formData.cena <= 0) newErrors.cena = "Cena musi być większa od 0.";
    if (formData.przebieg <= 0)
      newErrors.przebieg = "Przebieg musi być większy od 0.";

    if (!formData.rokProdukcji || formData.rokProdukcji > currentYear) {
      newErrors.rokProdukcji = `Rok produkcji nie może być późniejszy niż ${currentYear}.`;
    }

    if (formData.opis.trim().length < 20) {
      newErrors.opis = "Opis musi zawierać co najmniej 20 znaków.";
    }

    const { silnik, moc, spalanie } = formData.daneTechniczne;
    if (!silnik.trim() && moc <= 0 && spalanie <= 0) {
      newErrors.tech = "Uzupełnij przynajmniej jeden parametr techniczny.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditMode && id) {
      await updateCar(id, formData);
    } else {
      await addCar(formData);
    }

    navigate("/manage");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {isEditMode ? "Edycja Pojazdu" : "Nowe Ogłoszenie"}
      </h2>

      <form onSubmit={handleSubmit} className="car-form">
        <section className="form-section">
          <h3>Podstawowe Informacje</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Marka</label>
              <input
                className={errors.marka ? "input-error" : ""}
                value={formData.marka}
                onChange={(e) =>
                  setFormData({ ...formData, marka: e.target.value })
                }
              />
              {errors.marka && (
                <span className="error-text">{errors.marka}</span>
              )}
            </div>
            <div className="form-group">
              <label>Model</label>
              <input
                className={errors.model ? "input-error" : ""}
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
              />
              {errors.model && (
                <span className="error-text">{errors.model}</span>
              )}
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>Cena (PLN)</label>
              <input
                type="number"
                className={errors.cena ? "input-error" : ""}
                value={formData.cena}
                onChange={(e) =>
                  setFormData({ ...formData, cena: +e.target.value })
                }
              />
              {errors.cena && <span className="error-text">{errors.cena}</span>}
            </div>
            <div className="form-group">
              <label>Przebieg (km)</label>
              <input
                type="number"
                className={errors.przebieg ? "input-error" : ""}
                value={formData.przebieg}
                onChange={(e) =>
                  setFormData({ ...formData, przebieg: +e.target.value })
                }
              />
              {errors.przebieg && (
                <span className="error-text">{errors.przebieg}</span>
              )}
            </div>
            <div className="form-group">
              <label>Rok Produkcji</label>
              <input
                type="number"
                className={errors.rokProdukcji ? "input-error" : ""}
                value={formData.rokProdukcji}
                onChange={(e) =>
                  setFormData({ ...formData, rokProdukcji: +e.target.value })
                }
              />
              {errors.rokProdukcji && (
                <span className="error-text">{errors.rokProdukcji}</span>
              )}
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Dane Techniczne</h3>
          {errors.tech && (
            <span
              className="error-text"
              style={{ display: "block", marginBottom: "10px" }}
            >
              {errors.tech}
            </span>
          )}
          <div className="form-grid">
            <div className="form-group">
              <label>Silnik</label>
              <input
                className={errors.tech ? "input-error" : ""}
                value={formData.daneTechniczne.silnik}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    daneTechniczne: {
                      ...formData.daneTechniczne,
                      silnik: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Moc (KM)</label>
              <input
                type="number"
                className={errors.tech ? "input-error" : ""}
                value={formData.daneTechniczne.moc}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    daneTechniczne: {
                      ...formData.daneTechniczne,
                      moc: +e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Historia Serwisowa</h3>
          {formData.historiaSerwisowa.map((entry, index) => (
            <div key={index} className="service-item">
              <input
                type="date"
                max={today}
                value={entry.data}
                onChange={(e) =>
                  updateServiceEntry(index, "data", e.target.value)
                }
                className={entry.data > today ? "input-error" : ""}
              />
              <input
                placeholder="Opis serwisu"
                value={entry.opis}
                onChange={(e) =>
                  updateServiceEntry(index, "opis", e.target.value)
                }
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeServiceEntry(index)}
              >
                Usuń
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-add-service"
            onClick={addServiceEntry}
          >
            + Dodaj wpis serwisowy
          </button>
        </section>

        <div className="form-group">
          <label>Opis pojazdu</label>
          <textarea
            className={errors.opis ? "input-error" : ""}
            rows={5}
            value={formData.opis}
            onChange={(e) => setFormData({ ...formData, opis: e.target.value })}
          />
          {errors.opis && <span className="error-text">{errors.opis}</span>}
        </div>

        <section className="form-section availability-section">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="dostepny"
              checked={formData.dostepny}
              onChange={(e) =>
                setFormData({ ...formData, dostepny: e.target.checked })
              }
            />
            <label htmlFor="dostepny">Pojazd jest dostępny w ofercie</label>
          </div>
        </section>

        <div className="form-actions">
          <UniversalButton type="submit" variant="primary">
            {isEditMode ? "Zapisz Zmiany" : "Dodaj Ogłoszenie"}
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
