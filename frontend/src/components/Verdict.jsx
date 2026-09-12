import React from 'react';
import { ShieldCheck, ShieldAlert, ExternalLink } from 'lucide-react';
import Probability from './Probability';

export default function Verdict({ result }) {
  if (!result) return null;

  const {
    url,
    prediction,
    confidence,
    risk,
    probabilities = {},
  } = result;

  const isLegit = prediction === 'LEGITIMATE';

  return (
    <section className="result-section" id="verdict">
      <div className="container">
        <div className={`result-card ${isLegit ? 'legitimate' : 'phishing'}`}>
          {/* Header Row: Status, Risk Badge, Explanation */}
          <div className="result-header-row">
            <div className="result-verdict-group">
              <h2 className="result-status-title">
                {isLegit ? (
                  <ShieldCheck size={32} strokeWidth={2} color="#187A68" />
                ) : (
                  <ShieldAlert size={32} strokeWidth={2} color="#C94A4A" />
                )}
                <span>{prediction}</span>
              </h2>

              <p className="result-explanation">
                {isLegit
                  ? 'Site appears secure based on the analyzed signals.'
                  : 'Potential phishing indicators were detected.'}
              </p>
            </div>

            <div className={`result-meta-pill ${isLegit ? 'low-risk' : 'high-risk'}`}>
              {risk} RISK
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="result-metrics-grid">
            <div className="metric-cell">
              <div className="metric-label">Scanned URL</div>
              <div className="metric-value scanned-url" title={url}>
                {url}
              </div>
            </div>

            <div className="metric-cell">
              <div className="metric-label">Prediction</div>
              <div
                className="metric-value"
                style={{ color: isLegit ? 'var(--security-green)' : 'var(--threat-red)' }}
              >
                {prediction}
              </div>
            </div>

            <div className="metric-cell">
              <div className="metric-label">Risk Level</div>
              <div
                className="metric-value"
                style={{ color: isLegit ? 'var(--security-green)' : 'var(--threat-red)' }}
              >
                {risk}
              </div>
            </div>

            <div className="metric-cell">
              <div className="metric-label">Confidence</div>
              <div className="metric-value">
                {Number(confidence).toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Probability & Threshold Section */}
          <Probability
            probabilities={probabilities}
            confidence={confidence}
            prediction={prediction}
          />
        </div>
      </div>
    </section>
  );
}
