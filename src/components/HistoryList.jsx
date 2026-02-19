const HistoryList = ({ history, onClear }) => {
  if (!Array.isArray(history) || history.length === 0) {
    return null;
  }

  return (
    <div className="history-section">
      <h2>Історія пошуку</h2>
      <button onClick={onClear} className="clear-button">
        Очистити історію
      </button>
      {history.map((item, index) => (
        <div key={index} className="history-item">
          {item}
        </div>
      ))}
    </div>
  );
};
