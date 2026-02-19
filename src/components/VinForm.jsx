import { useState } from "react";

const VinForm = ({ onSearch }) => {
  const [vin, setVin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Видаляємо зайві пробіли та робимо літери великими
    const cleanVin = vin.trim().toUpperCase();
    onSearch(cleanVin);
    setVin(""); // Очищуємо поле після натискання кнопки
  };

  return (
    <form onSubmit={handleSubmit} className="vin-form">
      <input
        type="text"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
        placeholder="Введіть 17 символів VIN..."
        maxLength={17} // Не даємо ввести більше 17 символів
      />
      <button type="submit" className="check-btn">
        Перевірити
      </button>
    </form>
  );
};

export default VinForm;
