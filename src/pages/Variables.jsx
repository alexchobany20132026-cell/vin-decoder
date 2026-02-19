import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Variables = () => {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const res = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json",
        );
        const data = await res.json();
        setVariables(data.Results);
        setLoading(false);
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
        setError("Не вдалося завантажити список змінних");
        setLoading(false);
      }
    };

    fetchVariables();
  }, []);

  if (loading) return <p>Завантаження даних...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="variables-page">
      <h1>Список усіх змінних API</h1>
      <p>
        Нижче представлені всі параметри, які можуть бути повернуті при
        розшифровці VIN. Натисніть на назву змінної, щоб побачити її опис та
        приклади використання.
      </p>

      <ul className="variables-list">
        {variables.map((v) => (
          <li key={v.ID}>
            <Link to={`/variables/${v.ID}`}>
              <strong>{v.Name}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Variables;
