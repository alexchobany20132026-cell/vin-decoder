import { useState, useEffect } from "react";

const Home = () => {
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

  const handleSearch = (vin) => {
    if (!vin || typeof vin !== "string") return;
    const newHistory = [vin, ...history.filter((h) => h !== vin)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("vinHistory", JSON.stringify(newHistory));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Декодер VIN</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          id="vinInput"
          type="text"
          placeholder="Введіть VIN..."
          style={{ padding: "10px", width: "250px" }}
        />
        <button
          onClick={() =>
            handleSearch(document.getElementById("vinInput").value)
          }
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          Перевірити
        </button>
      </div>

      {/* Безпечний вивід історії */}
      {Array.isArray(history) && history.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            background: "#222",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>Останні запити:</h3>
          {history.map((item, index) => (
            <div key={index} style={{ margin: "5px 0", color: "#9db2ff" }}>
              {item}
            </div>
          ))}
          <button
            onClick={() => {
              setHistory([]);
              localStorage.removeItem("vinHistory");
            }}
            style={{
              marginTop: "10px",
              color: "red",
              background: "none",
              border: "1px solid red",
              cursor: "pointer",
            }}
          >
            Очистити
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
