import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const VariableDetails = () => {
  const { variableId } = useParams();
  const [variable, setVariable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json",
        );
        const data = await res.json();

        const found = data.Results.find(
          (item) => item.ID.toString() === variableId,
        );
        setVariable(found);
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
        setLoading(false);
      }
    };
    fetchDetails();
  }, [variableId]);

  if (loading) return <p>Загрузка описания...</p>;
  if (!variable)
    return (
      <p>
        Переменная не найдена. <Link to="/variables">Вернуться к списку</Link>
      </p>
    );

  return (
    <div className="variable-details">
      <Link to="/variables">← Назад к списку</Link>
      <h1>{variable.Name}</h1>
      <div
        className="description-box"
        dangerouslySetInnerHTML={{ __html: variable.Description }}
      />
    </div>
  );
};

export default VariableDetails;
