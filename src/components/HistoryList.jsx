const HistoryList = ({ history, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="history-section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <p>Останні запити:</p>
        <button onClick={onClear} className="clear-btn">
          Очистити
        </button>
      </div>
      <div className="results-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
