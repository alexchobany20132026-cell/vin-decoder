import { useState } from "react";

const VinForm = ({ onSearch }) => {
  const [vin, setVin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vin.trim()) {
      onSearch(vin);
      setVin("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="vin-form">
      <input
        type="text"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
        placeholder="Введіть 17 символів..."
      />
      <button type="submit" className="check-btn">
        Перевірити
      </button>
    </form>
  );
};

export default VinForm;
