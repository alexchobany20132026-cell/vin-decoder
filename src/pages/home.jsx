import { useState, useEffect } from "react";

const Home = () => {
  const [history, setHistory] = useState([]);
  const [vin, setVin] = useState("");

  // 1. Завантаження історії при старті
  useEffect(() => {
    const saved = localStorage.getItem("vinHistory");
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      setHistory(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setHistory([]);
    }
  }, []);

  // 2. Функція пошуку
  const handleSearch = (e) => {
    e.preventDefault();
    if (!vin.trim()) return;

    const newHistory = [vin, ...history.filter((h) => h !== vin)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("vinHistory", JSON.stringify(newHistory));
    setVin(""); // Очищуємо поле
  };

  // 3. Функція очищення
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("vinHistory");
  };

  return (
    <div className="home-page" style={{ padding: "20px", textAlign: "center" }}>
      <h1>Декодер VIN</h1>

      {/* Форма пошуку */}
      <form
        onSubmit={handleSearch}
        className="vin-form"
        style={{ marginBottom: "30px" }}
      >
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="Введіть 17 символів VIN..."
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: "#2a2a2a",
            color: "white",
          }}
        />
        <button
          type="submit"
          className="check-btn"
          style={{
            padding: "12px 20px",
            marginLeft: "10px",
            cursor: "pointer",
            borderRadius: "8px",
            background: "#007bff",
            color: "white",
            border: "none",
          }}
        >
          Перевірити
        </button>
      </form>

      {/* Секція історії з захистом від помилки .map */}
      {Array.isArray(history) && history.length > 0 && (
        <div
          className="history-section"
          style={{
            background: "#242424",
            padding: "20px",
            borderRadius: "12px",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ margin: 0 }}>Останні запити:</h3>
            <button
              onClick={clearHistory}
              className="clear-btn"
              style={{
                color: "#ff4d4d",
                background: "none",
                border: "1px solid #ff4d4d",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Очистити
            </button>
          </div>

          <div className="results-list">
            {history.map((item, index) => (
              <div
                key={index}
                className="history-item"
                style={{
                  background: "#333",
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "6px",
                  textAlign: "left",
                  color: "#9db2ff",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
