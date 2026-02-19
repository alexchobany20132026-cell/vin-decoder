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
    setError("");

    if (vin.length !== 17) {
      setError("Помилка: VIN має містити рівно 17 символів!");
      return;
    }

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

      {}
      {error && (
        <div
          style={{
            color: "white",
            background: "#ff4d4d",
            padding: "10px",
            borderRadius: "5px",
            margin: "10px 0",
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
