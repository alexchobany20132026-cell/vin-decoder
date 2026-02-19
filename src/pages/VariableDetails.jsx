import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const VariableDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`,
    )
      .then((res) => res.json())
      .then((data) => {
        const item = data.Results.find((v) => v.ID.toString() === id);
        setDetails(item);
      });
  }, [id]);

  if (!details) return <p>Завантаження деталей...</p>;

  return (
    <div className="details-page">
      <button onClick={() => navigate(-1)}>← Назад</button>
      <h1>{details.Name}</h1>
      <div
        className="description-card"
        dangerouslySetInnerHTML={{ __html: details.Description }}
      />
    </div>
  );
};

export default VariableDetails;
