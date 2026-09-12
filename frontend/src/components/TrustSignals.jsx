import React from 'react';

export default function TrustSignals() {
  return (
    <section className="trust-section">
      <div className="container">
        <h2 className="trust-title">Built around measurable signals.</h2>

        <div className="trust-metrics-row">
          <div className="trust-metric-box">
            <div className="trust-metric-number">18</div>
            <div className="trust-metric-label">Model Features</div>
          </div>

          <div className="trust-metric-box">
            <div className="trust-metric-number">XGBoost V4</div>
            <div className="trust-metric-label">Classification Engine</div>
          </div>

          <div className="trust-metric-box">
            <div className="trust-metric-number">60%</div>
            <div className="trust-metric-label">Decision Threshold</div>
          </div>
        </div>
      </div>
    </section>
  );
}
