import React from "react";

const HistoryList = ({ history, onClear }) => {
  const safeHistory = Array.isArray(history) ? history : [];

  if (safeHistory.length === 0) {
    return null;
  }

  return (
    <div className="history-section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ margin: 0 }}>Останні запити:</h3>
        <button onClick={onClear} className="clear-btn">
          Очистити
        </button>
      </div>

      <div className="results-list">
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
