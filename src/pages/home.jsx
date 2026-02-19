import { useState, useEffect } from "react";
import VinForm from "../components/VinForm";
import HistoryList from "../components/HistoryList";

const Home = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(""); // Стан для помилки

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
    setError(""); // Скидаємо стару помилку перед новою перевіркою

    // Валідація: VIN має бути рівно 17 символів
    if (vin.length !== 17) {
      setError("Помилка: VIN-код повинен містити рівно 17 символів!");
      return;
    }

    // Якщо все ок, додаємо в історію
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

      {/* Вивід повідомлення про помилку */}
      {error && (
        <div
          style={{ color: "#ff4d4d", marginBottom: "15px", fontWeight: "bold" }}
        >
          {error}
        </div>
      )}

      <HistoryList history={history} onClear={clearHistory} />
    </div>
  );
};

export default Home;
