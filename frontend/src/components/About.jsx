import React from 'react';

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-card">
          <h2 className="about-heading">About PhishXen</h2>
          <p className="about-paragraph">
            PhishXen is an AI-assisted phishing URL detection system that analyzes URL and webpage characteristics and uses an XGBoost classification model to identify potentially malicious websites.
          </p>
          <p className="about-paragraph">
            Unlike static blocklists that only recognize previously reported malicious domains, PhishXen evaluates structural patterns directly from the incoming URL and the live HTML document.
          </p>

          <ul className="about-points-list">
            <li className="about-point-item">
              <span className="about-point-bullet" />
              <span>18 measurable model features</span>
            </li>
            <li className="about-point-item">
              <span className="about-point-bullet" />
              <span>Real-time URL lexical structure analysis</span>
            </li>
            <li className="about-point-item">
              <span className="about-point-bullet" />
              <span>Live webpage DOM and resource parsing</span>
            </li>
            <li className="about-point-item">
              <span className="about-point-bullet" />
              <span>Calibrated XGBoost V4 classification engine</span>
            </li>
            <li className="about-point-item">
              <span className="about-point-bullet" />
              <span>Confidence-based risk assessment</span>
            </li>
            <li className="about-point-item">
              <span className="about-point-bullet" />
              <span>Strict 60% probability decision boundary</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
