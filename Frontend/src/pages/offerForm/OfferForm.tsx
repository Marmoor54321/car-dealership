import React, { useState } from "react";
import "./OfferForm.css";
import type { Offer, PaymentMethod, Address } from "../../types";

interface OfferFormProps {
  carId: string;
  carName: string;
  onClose: () => void;
  onSubmit: (data: Omit<Offer, "id" | "dataZlozenia">) => void;
}

const AVAILABLE_BRANDS = ["Audi", "BMW", "Mercedes", "Toyota", "Ford", "Volvo"];

export const OfferForm: React.FC<OfferFormProps> = ({
  carId,
  carName,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    imie: "",
    nazwisko: "",
    wiek: 18,
    telefon: "",
    metodaPlatnosci: "GOTÓWKA" as PaymentMethod,
    preferowaneMarki: [] as string[],
    adres: {
      ulica: "",
      miasto: "",
      kodPocztowy: "",
    } as Address,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.imie.trim()) newErrors.imie = "Imię jest wymagane.";

    if (!formData.nazwisko.trim())
      newErrors.nazwisko = "Nazwisko jest wymagane.";

    if (formData.wiek < 18) newErrors.wiek = "Musisz być pełnoletni.";

    if (!/^\d{9}$/.test(formData.telefon))
      newErrors.telefon = "Numer musi mieć dokładnie 9 cyfr.";

    if (!/^\d{2}-\d{3}$/.test(formData.adres.kodPocztowy)) {
      newErrors.kodPocztowy = "Format: 00-000";
    }
    if (!formData.adres.miasto) newErrors.miasto = "Podaj miasto.";
    if (!formData.adres.ulica) newErrors.ulica = "Podaj ulicę.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...formData, carId });
    }
  };

  const toggleBrand = (brand: string) => {
    const updated = formData.preferowaneMarki.includes(brand)
      ? formData.preferowaneMarki.filter((b) => b !== brand)
      : [...formData.preferowaneMarki, brand];
    setFormData({ ...formData, preferowaneMarki: updated });
  };

  return (
    <div className="modal-overlay">
      <div className="offer-modal">
        <h2>Złóż ofertę na: {carName}</h2>
        <form onSubmit={handleSubmit} className="offer-form">
          <div className="form-row">
            <div className="form-group flex-1">
              <label>Imię:</label>
              <input
                className={errors.imie ? "input-error" : ""}
                value={formData.imie}
                onChange={(e) =>
                  setFormData({ ...formData, imie: e.target.value })
                }
              />
            </div>
            <div className="form-group flex-1">
              <label>Nazwisko:</label>
              <input
                className={errors.nazwisko ? "input-error" : ""}
                value={formData.nazwisko}
                onChange={(e) =>
                  setFormData({ ...formData, nazwisko: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Wiek:</label>
              <input
                type="number"
                className={errors.wiek ? "input-error" : ""}
                value={formData.wiek}
                onChange={(e) =>
                  setFormData({ ...formData, wiek: +e.target.value })
                }
              />
            </div>
            <div className="form-group flex-2">
              <label>Telefon:</label>
              <input
                className={errors.telefon ? "input-error" : ""}
                value={formData.telefon}
                onChange={(e) =>
                  setFormData({ ...formData, telefon: e.target.value })
                }
              />
            </div>
          </div>

          <div className="address-box">
            <label>Adres zamieszkania:</label>
            <input
              placeholder="Ulica i numer"
              value={formData.adres.ulica}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  adres: { ...formData.adres, ulica: e.target.value },
                })
              }
            />
            <div className="form-row">
              <input
                className={errors.kodPocztowy ? "input-error" : ""}
                placeholder="Kod (00-000)"
                style={{ flex: 1 }}
                value={formData.adres.kodPocztowy}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    adres: { ...formData.adres, kodPocztowy: e.target.value },
                  })
                }
              />
              <input
                placeholder="Miasto"
                style={{ flex: 2 }}
                value={formData.adres.miasto}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    adres: { ...formData.adres, miasto: e.target.value },
                  })
                }
              />
            </div>
            {errors.kodPocztowy && (
              <span className="error-text">{errors.kodPocztowy}</span>
            )}
          </div>

          <div className="form-group">
            <label>Metoda płatności:</label>
            <select
              value={formData.metodaPlatnosci}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  metodaPlatnosci: e.target.value as PaymentMethod,
                })
              }
            >
              <option value="GOTÓWKA">Gotówka</option>
              <option value="LEASING">Leasing</option>
            </select>
          </div>

          <div className="form-group">
            <label>Inne interesujące marki:</label>
            <div className="brands-grid">
              {AVAILABLE_BRANDS.map((brand) => (
                <label key={brand} className="brand-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.preferowaneMarki.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />{" "}
                  {brand}
                </label>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-submit">
              Wyślij ofertę
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
