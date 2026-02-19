import { useState } from "react";

const VinForm = ({ onSearch }) => {
  const [vin, setVin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanVin = vin.trim().toUpperCase(); // Приводимо до верхнього регістру
    onSearch(cleanVin);
    setVin("");
  };

  return (
    <form onSubmit={handleSubmit} className="vin-form">
      <input
        type="text"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
        placeholder="Введіть 17 символів..."
        maxLength={17} // Обмежуємо введення в самому полі
      />
      <button type="submit" className="check-btn">
        Перевірити
      </button>
    </form>
  );
};

export default VinForm;
