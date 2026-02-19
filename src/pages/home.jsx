import React, { useState, useEffect } from "react";

const Home = () => {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Виправляємо попередження ESLint: використовуємо функцію для ініціалізації стану
  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = JSON.parse(localStorage.getItem("vinHistory")) || [];
      setHistory(savedHistory);
    };
    loadHistory();
  }, []);

  // ФУНКЦІЯ ЗАПИТУ (Тепер вона точно async і всередині компонента)
  const handleSearch = async () => {
    const cleanVin = vin.trim();

    if (cleanVin.length !== 17) {
      alert("VIN-номер має складатися з 17 символів!");
      return;
    }

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${cleanVin}?format=json`,
      );
      const data = await response.json();

      setResult(data.Results);

      // Оновлення історії
      const newHistory = [
        cleanVin,
        ...history.filter((h) => h !== cleanVin),
      ].slice(0, 3);
      setHistory(newHistory);
      localStorage.setItem("vinHistory", JSON.stringify(newHistory));
    } catch (error) {
      console.error("Помилка:", error);
      alert("Сталася помилка при завантаженні даних.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        color: "#fff",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.5rem, 7vw, 2.5rem)",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Декодер VIN
      </h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          placeholder="Введіть 17 символів..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid #444",
            backgroundColor: "#333",
            color: "#fff",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "12px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Перевірити
        </button>
      </div>

      {history.length > 0 && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#2a2a2a",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#aaa" }}>
            Останні запити:
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {history.map((item, index) => (
              <span
                key={index}
                onClick={() => setVin(item)}
                style={{
                  cursor: "pointer",
                  padding: "5px 10px",
                  backgroundColor: "#444",
                  borderRadius: "3px",
                  fontSize: "14px",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div
          style={{
            background: "#2a2a2a",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #444",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Результати:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {result
              .filter(
                (item) =>
                  item.Value &&
                  item.Value !== "0" &&
                  item.Variable !== "Error Text",
              )
              .slice(0, 10)
              .map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                    paddingBottom: "5px",
                    borderBottom: "1px solid #3d3d3d",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#aaa" }}>{item.Variable}:</span>{" "}
                  <span style={{ color: "#fff" }}>{item.Value}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
