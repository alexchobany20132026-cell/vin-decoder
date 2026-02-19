import { useState, useEffect } from "react";

const VinForm = ({ onSearch }) => {
  const [vin, setVin] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(vin);
        setVin("");
      }}
      className="vin-form"
    >
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

const HistoryList = ({ data, onClear }) => {
  if (!Array.isArray(data) || data.length === 0) return null;
  return (
    <div className="history-section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h3>Останні запити:</h3>
        <button onClick={onClear} className="clear-btn">
          Очистити
        </button>
      </div>
      <div className="results-list">
        {data.map((item, index) => (
          <div key={index} className="history-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("vinHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(Array.isArray(parsed) ? parsed : []);
      } catch {
        setHistory([]);
      }
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
      <HistoryList data={history} onClear={clearHistory} />
    </div>
  );
};

export default Home;
