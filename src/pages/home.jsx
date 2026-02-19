import { useState, useEffect } from "react";
import VinForm from "../components/VinForm";
import HistoryList from "../components/HistoryList";

const Home = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vinHistory");

      const parsed = saved ? JSON.parse(saved) : [];
      setHistory(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error("Помилка при читанні історії:", error);
      setHistory([]);
    }
  }, []);

  const handleSearch = (vin) => {
    if (!vin) return;

    const newHistory = [vin, ...history.filter((item) => item !== vin)].slice(
      0,
      5,
    );
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
      {}
      <HistoryList history={history} onClear={clearHistory} />
    </div>
  );
};

export default Home;
