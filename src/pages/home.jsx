const [history, setHistory] = useState([]);

useEffect(() => {
  const saved = localStorage.getItem("vinHistory");
  try {
    const parsed = saved ? JSON.parse(saved) : [];
    setHistory(Array.isArray(parsed) ? parsed : []);
  } catch (e) {
    setHistory([]);
  }
}, []);
import { useState, useEffect } from "react";
import VinForm from "../components/VinForm";
import HistoryList from "../components/HistoryList";

const Home = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vinHistory") || "[]");
    setHistory(saved);
  }, []);

  const handleSearch = (vin) => {
    const newHistory = [vin, ...history.slice(0, 4)];
    setHistory(newHistory);
    localStorage.setItem("vinHistory", JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("vinHistory");
  };

  return (
    <div id="root">
      <h1>Декодер VIN</h1>
      <VinForm onSearch={handleSearch} />
      <HistoryList history={history} onClear={clearHistory} />
    </div>
  );
};

export default Home;
