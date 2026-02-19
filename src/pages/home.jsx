import { useState, useEffect } from "react";
import VinForm from "../components/VinForm";
import HistoryList from "../components/HistoryList";

const Home = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(""); // Стан для тексту помилки

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
    // 1. Очищуємо попередню помилку
    setError("");

    // 2. ПЕРЕВІРКА: якщо довжина не 17 знаків
    if (vin.length !== 17) {
      setError("Помилка: VIN має містити рівно 17 символів!");
      return; // Зупиняємо виконання, далі код не йде
    }

    // 3. Якщо VIN правильний, додаємо в історію
    setHistory((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      const newHistory = [vin, ...current.filter((h) => h !== vin)].slice(0, 5);
      localStorage.setItem("vinHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("vinHistory");
  };

  return (
    <div className="home-page">
      <h1>Декодер VIN</h1>

      <VinForm onSearch={handleSearch} />

      {/* ВИВІД ПОМИЛКИ: показуємо тільки якщо error не порожній */}
      {error && (
        <div
          style={{
            color: "white",
            background: "#ff4d4d",
            padding: "10px",
            borderRadius: "5px",
            margin: "10px 0",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      <HistoryList history={history} onClear={clearHistory} />
    </div>
  );
};

export default Home;
