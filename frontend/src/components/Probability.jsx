import React from 'react';

export default function Probability({ probabilities = {}, confidence, prediction }) {
  const isPhishing = prediction === 'PHISHING';

  const phishProb = typeof probabilities.phishing === 'number'
    ? probabilities.phishing
    : (isPhishing ? confidence : (100 - confidence));

  const legitProb = typeof probabilities.legitimate === 'number'
    ? probabilities.legitimate
    : (isPhishing ? (100 - confidence) : confidence);

  return (
    <div className="probability-box">
      <div className="prob-meta-row">
        <span className="prob-title">Probability Distribution</span>
        <span className="prob-threshold-note">Decision threshold: 60%</span>
      </div>

      {/* Horizontal Bar with 60% Threshold Marker */}
      <div className="prob-bar-wrapper">
        <div className="threshold-tick" title="60% Phishing Decision Boundary">
          <span className="threshold-tick-label">60%</span>
        </div>

        <div className="prob-bar-track">
          <div
            className="prob-fill-phish"
            style={{ width: `${Math.max(0, Math.min(100, phishProb))}%` }}
          />
          <div
            className="prob-fill-legit"
            style={{ width: `${Math.max(0, Math.min(100, legitProb))}%` }}
          />
        </div>
      </div>

      {/* Numerical Legend */}
      <div className="prob-legend-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--threat-red)' }} />
          <span>Phishing: <strong>{Number(phishProb).toFixed(2)}%</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--security-green)' }} />
          <span>Legitimate: <strong>{Number(legitProb).toFixed(2)}%</strong></span>
        </div>
      </div>
    </div>
  );
}
