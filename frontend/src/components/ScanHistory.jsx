import React from 'react';
import { History, Trash2, Clock, ArrowUpRight, ShieldCheck, ShieldAlert } from 'lucide-react';

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
    <section className="history-section" id="history">
      <div className="container">
        <div className="history-wrapper-card">
          <div className="history-header-row">
            <div className="history-title-group">
              <div className="history-icon-bubble">
                <History size={16} />
              </div>
              <div>
                <h3 className="history-main-title">Recent Scan History</h3>
                <p className="history-sub-text">
                  Local cache of previous URL analyses performed in this browser session.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-clear-history"
              onClick={onClear}
              title="Remove stored scans from localStorage"
            >
              <Trash2 size={13} />
              <span>Clear History</span>
            </button>
          </div>

          <div className="history-items-grid">
            {history.map((item, idx) => {
              const isLegit = item.prediction === 'LEGITIMATE';
              const confNumber = Number(item.confidence) || 0;

              return (
                <div
                  key={`${item.url}-${idx}`}
                  className="history-entry-card"
                  onClick={() => onSelect(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onSelect(item);
                  }}
                  title="Click to view full security signals in the dashboard"
                >
                  <div className="history-entry-top">
                    <span className="history-url-text">{item.url}</span>
                    <ArrowUpRight size={14} className="history-arrow-peek" />
                  </div>

                  <div className="history-entry-bottom">
                    <div className="history-status-pills">
                      <span className={`history-verdict-pill ${isLegit ? 'verdict-pill-legit' : 'verdict-pill-phish'}`}>
                        {isLegit ? (
                          <ShieldCheck size={12} className="inline-pill-icon" />
                        ) : (
                          <ShieldAlert size={12} className="inline-pill-icon" />
                        )}
                        <span>{item.prediction}</span>
                      </span>

                      <span className={`history-risk-pill risk-${(item.risk || 'low').toLowerCase()}`}>
                        {item.risk} RISK
                      </span>

                      <span className="history-conf-val">
                        {confNumber.toFixed(1)}% conf.
                      </span>
                    </div>

                    {item.timestamp && (
                      <div className="history-timestamp">
                        <Clock size={11} className="timestamp-icon" />
                        <span>{formatTime(item.timestamp)}</span>
                      </div>
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
