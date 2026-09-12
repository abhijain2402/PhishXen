import React from 'react';

export default function ScanHistory({ history, onSelect, onClear }) {
  if (!history || history.length === 0) return null;

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <section className="history-section">
      <div className="container">
        <div className="history-card">
          <div className="history-header-row">
            <h3 className="history-title">Recent scans</h3>
            <button
              type="button"
              className="btn-clear-history"
              onClick={onClear}
            >
              Clear history
            </button>
          </div>

          <div className="history-items-list">
            {history.map((item, idx) => {
              const isLegit = item.prediction === 'LEGITIMATE';

              return (
                <div
                  key={`${item.url}-${idx}`}
                  className="history-item-row"
                  onClick={() => onSelect(item)}
                  title="Click to view full signals"
                >
                  <span className="history-item-url">{item.url}</span>

                  <div className="history-item-meta">
                    <span className={isLegit ? 'history-tag-legit' : 'history-tag-phish'}>
                      {item.prediction}
                    </span>
                    <span>{Number(item.confidence).toFixed(1)}%</span>
                    {item.timestamp && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {formatTime(item.timestamp)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
