import { useState } from "react";

const Home = () => {
  const [vin, setVin] = useState("");
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("vinHistory")) || [],
  );
  const [error, setError] = useState("");

  const handleSearch = async (vinToSearch) => {
    const regex = /^[a-zA-Z0-9]+$/;

    if (!vinToSearch) {
      setError("Поле не може бути порожнім");
      return;
    }
    if (vinToSearch.length > 17) {
      setError("Максимум 17 символів");
      return;
    }
    if (!regex.test(vinToSearch)) {
      setError("Заборонені символи (тільки латиниця та цифри)");
      return;
    }

    setError("");

    try {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vinToSearch}?format=json`,
      );
      const data = await res.json();

      const filtered = data.Results.filter(
        (item) => item.Value && item.Value !== "" && item.Value !== "0",
      );
      setResults(filtered);

      const newHistory = [
        vinToSearch,
        ...history.filter((v) => v !== vinToSearch),
      ].slice(0, 3);
      setHistory(newHistory);
      localStorage.setItem("vinHistory", JSON.stringify(newHistory));
    } catch (error) {
      {
        error && (
          <div
            style={{ color: "red", marginTop: "10px" }}
            className="error-message"
          >
            {error}
          </div>
        );
      }
      setError("Сталася помилка при з’єднанні з сервером");
    }

    <div className="history">{}</div>;
  };

  return (
    <div className="home-page">
      <h1>Декодер VIN</h1>

      <div className="search-section">
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          placeholder="Введіть 17-значний VIN"
        />
        <button onClick={() => handleSearch(vin)}>Перевірити</button>
      </div>

      {error && (
        <p className="error-msg" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <p>Останні запити:</p>
          {history.map((item) => (
            <button
              key={item}
              onClick={() => {
                setVin(item);
                handleSearch(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="results-list">
        {results.length > 0 && <h2>Результати для {vin}:</h2>}
        <ul>
          {results.map((res, index) => (
            <li key={index}>
              <strong>{res.Variable}:</strong> {res.Value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
