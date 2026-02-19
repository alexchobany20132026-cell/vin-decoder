import { useState, useEffect } from "react";
import VinForm from "../components/VinForm";
import HistoryList from "../components/HistoryList";

const Home = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("vinHistory");
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      // Перевіряємо, чи parsed це дійсно масив
      setHistory(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setHistory([]);
    }
  }, []);

  const handleSearch = (vin) => {
    if (!vin.trim()) return;
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
      {/* Передаємо масив history у компонент */}
      <HistoryList history={history} onClear={clearHistory} />
    </div>
  );
};

export default Home;
