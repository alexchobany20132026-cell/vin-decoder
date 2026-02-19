const HistoryList = ({ history, onClear }) => {
  // Якщо history прийшов "битий" або це не масив — робимо його порожнім масивом
  const safeHistory = Array.isArray(history) ? history : [];

  // Якщо масив порожній — нічого не малюємо
  if (safeHistory.length === 0) return null;

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
        {/* Тепер .map викликається на safeHistory, який 100% є масивом */}
        {safeHistory.map((item, index) => (
          <div key={index} className="history-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
