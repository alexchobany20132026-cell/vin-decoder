const HistoryList = ({ history, onClear }) => {
  // Захист: якщо history не масив, робимо його порожнім
  const data = Array.isArray(history) ? history : [];

  if (data.length === 0) return null;

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

export default HistoryList;
