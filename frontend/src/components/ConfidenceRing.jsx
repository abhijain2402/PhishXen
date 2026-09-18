import React from 'react';

/**
 * Circular confidence meter + Legitimate / Phishing probability breakdown.
 * Uses strictly the real backend response data.
 */
export default function ConfidenceRing({ confidence, probabilities = {}, prediction }) {
  const isLegit = prediction === 'LEGITIMATE';
  const strokeColor = isLegit ? 'var(--security-green)' : 'var(--threat-red)';

  const confNumber = typeof confidence === 'number' ? confidence : parseFloat(confidence) || 0;
  const clampedConf = Math.max(0, Math.min(100, confNumber));

  // Circular gauge geometry
  const radius = 64;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedConf / 100) * circumference;

  // Actual probabilities returned by the backend
  const phishProb = typeof probabilities.phishing === 'number'
    ? probabilities.phishing
    : (isLegit ? (100 - confNumber) : confNumber);

  const legitProb = typeof probabilities.legitimate === 'number'
    ? probabilities.legitimate
    : (isLegit ? confNumber : (100 - confNumber));

  return (
    <div className="confidence-meter-card">
      <div className="confidence-meter-header">
        <span className="confidence-meter-title">Model Confidence</span>
        <span className="confidence-meter-chip">XGBoost V4</span>
      </div>

      {/* Circular Progress Display */}
      <div className="confidence-ring-wrapper">
        <svg
          className="confidence-ring-svg"
          width="160"
          height="160"
          viewBox="0 0 160 160"
          aria-hidden="true"
        >
          {/* Subtle background track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--bg-secondary)"
            strokeWidth={strokeWidth}
          />
          {/* Animated active progress ring */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>

        {/* Center Readout */}
        <div className="confidence-ring-content">
          <span className="confidence-ring-val">{confNumber.toFixed(2)}%</span>
          <span className="confidence-ring-sub">Confidence</span>
        </div>
      </div>

      {/* Probabilities Breakdown */}
      <div className="probabilities-breakdown">
        <div className="prob-row">
          <div className="prob-label-group">
            <span className="prob-indicator-dot dot-legit" />
            <span className="prob-name">Legitimate probability</span>
          </div>
          <span className="prob-value">{Number(legitProb).toFixed(2)}%</span>
        </div>
        <div className="prob-track-subtle">
          <div
            className="prob-fill-emerald"
            style={{ width: `${Math.max(0, Math.min(100, legitProb))}%` }}
          />
        </div>

        <div className="prob-row" style={{ marginTop: '0.85rem' }}>
          <div className="prob-label-group">
            <span className="prob-indicator-dot dot-phish" />
            <span className="prob-name">Phishing probability</span>
          </div>
          <span className="prob-value">{Number(phishProb).toFixed(2)}%</span>
        </div>
        <div className="prob-track-subtle">
          <div
            className="prob-fill-crimson"
            style={{ width: `${Math.max(0, Math.min(100, phishProb))}%` }}
          />
        </div>
      </div>

      <div className="prob-footer-note">
        <span>Decision boundary: 60% phishing probability threshold</span>
      </div>
    </div>
  );
}
