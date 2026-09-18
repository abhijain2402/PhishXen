import React from 'react';
import { Check, AlertTriangle, Shield, Globe, Lock, Unlock, ExternalLink } from 'lucide-react';
import ConfidenceRing from './ConfidenceRing';

export default function Verdict({ result }) {
  if (!result) return null;

  const {
    url,
    prediction,
    confidence,
    risk,
    probabilities = {},
    features = {},
  } = result;

  const isLegit = prediction === 'LEGITIMATE';
  const isHttps = features?.IsHTTPS === 1;

  // Extract clean hostname for technical display
  let cleanHostname = url;
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    cleanHostname = parsed.hostname;
  } catch {
    cleanHostname = url;
  }

  return (
    <section className="verdict-dashboard-section" id="detection">
      <div className="container">
        <div className="section-header-compact">
          <div className="section-eyebrow-small">
            <span className="eyebrow-accent-bar" />
            <span>SECURITY ANALYSIS VERDICT</span>
          </div>
          <h2 className="verdict-section-title">Detection Result</h2>
        </div>

        <div className={`verdict-master-card ${isLegit ? 'verdict-legit' : 'verdict-phish'}`}>
          {/* Top Banner: Prominent Verdict Status & Risk */}
          <div className="verdict-hero-banner">
            <div className="verdict-hero-main">
              <div className={`verdict-emblem-box ${isLegit ? 'emblem-legit' : 'emblem-phish'}`}>
                {isLegit ? (
                  <Check size={36} strokeWidth={2.5} className="emblem-icon" />
                ) : (
                  <AlertTriangle size={36} strokeWidth={2.5} className="emblem-icon" />
                )}
              </div>

              <div className="verdict-text-block">
                <div className="verdict-label-row">
                  <span className="verdict-classification-tag">
                    {isLegit ? 'VERIFIED LEGITIMATE' : 'MALICIOUS PATTERN DETECTED'}
                  </span>
                  <div className={`risk-badge risk-${(risk || 'low').toLowerCase()}`}>
                    {risk} RISK
                  </div>
                </div>

                <h3 className="verdict-primary-name">
                  {prediction}
                </h3>

                <p className="verdict-summary-line">
                  {isLegit
                    ? `Low risk assessment with ${Number(confidence).toFixed(2)}% confidence. No critical phishing markers identified across 18 features.`
                    : `High risk assessment with ${Number(confidence).toFixed(2)}% confidence. Significant phishing indicators detected in webpage signals.`}
                </p>
              </div>
            </div>
          </div>

          {/* Core Analytics Grid: Technical URL Card + Confidence Ring */}
          <div className="verdict-grid-split">
            {/* Left Card: URL Information Technical Card */}
            <div className="technical-url-card">
              <div className="card-header-bar">
                <span className="card-header-label">ANALYZED URL INTELLIGENCE</span>
                <Globe size={15} className="text-muted-icon" />
              </div>

              <div className="tech-field-group">
                <span className="tech-field-title">ANALYZED URL</span>
                <div className="tech-url-display" title={url}>
                  <span className="tech-url-hostname">{cleanHostname}</span>
                  <a
                    href={url.startsWith('http') ? url : `https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-url-link"
                    title="Open URL in new tab"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <span className="tech-url-raw">{url}</span>
              </div>

              <div className="tech-data-divider" />

              <div className="tech-metrics-matrix">
                <div className="tech-sub-cell">
                  <span className="tech-sub-label">STATUS</span>
                  <div className="tech-sub-value">
                    {isHttps ? (
                      <span className="status-ssl-good">
                        <Lock size={13} className="inline-lock-icon" />
                        HTTPS Enabled
                      </span>
                    ) : (
                      <span className="status-ssl-warn">
                        <Unlock size={13} className="inline-lock-icon" />
                        HTTP Insecure
                      </span>
                    )}
                  </div>
                </div>

                <div className="tech-sub-cell">
                  <span className="tech-sub-label">RISK LEVEL</span>
                  <span className={`tech-sub-value risk-text-${(risk || 'low').toLowerCase()}`}>
                    {risk}
                  </span>
                </div>

                <div className="tech-sub-cell">
                  <span className="tech-sub-label">EVALUATED</span>
                  <span className="tech-sub-value">18 Signals</span>
                </div>

                <div className="tech-sub-cell">
                  <span className="tech-sub-label">ENGINE</span>
                  <span className="tech-sub-value">XGBoost V4</span>
                </div>
              </div>
            </div>

            {/* Right Card: Confidence Visualization & Probability */}
            <ConfidenceRing
              confidence={confidence}
              probabilities={probabilities}
              prediction={prediction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
