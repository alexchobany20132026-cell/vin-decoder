import { useState, useEffect } from "react";
import VinForm from "../components/VinForm";
import HistoryList from "../components/HistoryList";

const Home = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("vinHistory");
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      setHistory(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setHistory([]);
    }
  }, []);

  const handleSearch = (vin) => {
    setError(""); // Скидаємо стару помилку

    // Перевірка на правильність (наприклад, рівно 17 символів)
    if (vin.length !== 17) {
      setError("Помилка: Неправильний VIN. Має бути 17 символів!");
      return; // Зупиняємо функцію, не додаємо в історію
    }

    // Якщо все добре — додаємо в масив
    const newHistory = [vin, ...history.filter((h) => h !== vin)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("vinHistory", JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("vinHistory");
  };

  return (
    <div className="home-page">
      <h1>Декодер VIN</h1>
      <VinForm onSearch={handleSearch} />

      {/* Вивід помилки */}
      {error && (
        <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
          {error}
        </p>
      )}

      <HistoryList history={history} onClear={clearHistory} />
    </div>
  );
};

export default Home;
