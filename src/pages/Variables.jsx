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
        setError("Не удалось загрузить список переменных");
        setLoading(false);
      }
    };

    fetchVariables();
  }, []);

  if (loading) return <p>Загрузка данных...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="variables-page">
      <h1>Список всех переменных API</h1>
      <p>
        Ниже представлены все параметры, которые могут быть возвращены при
        расшифровке VIN.
      </p>

      <ul className="variables-list">
        {variables.map((v) => (
          <li key={v.ID}>
            {/* Ссылка на страницу с подробным описанием переменной */}
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
