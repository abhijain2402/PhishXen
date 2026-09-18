import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';

const HIGHLIGHTS = [
  '18 measurable lexical & DOM features',
  'Real-time URL structure & character ratio decomposition',
  'Live webpage DOM tree and script reference parsing',
  'Calibrated XGBoost V4 gradient-boosted decision trees',
  'Probabilistic risk assessment (Phishing vs. Legitimate)',
  'Strict 60% probability decision boundary',
];

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-panel-card">
          <div className="about-header-group">
            <div className="about-eyebrow">
              <span className="eyebrow-accent-bar" />
              <span>DETECTION METHODOLOGY</span>
            </div>
            <h2 className="about-main-heading">Designed for Threat Intelligence</h2>
            <p className="about-lead">
              PhishXen is an AI-assisted phishing URL detection system that inspects URL syntax and live webpage characteristics, evaluating them with an XGBoost classification model to identify deceptive websites.
            </p>
          </div>

          <div className="about-content-split">
            <div className="about-text-column">
              <p className="about-paragraph">
                Unlike static blocklists that only recognize previously reported domains, PhishXen calculates security heuristics on the fly directly from the target address and the returned HTML markup.
              </p>
              <p className="about-paragraph">
                This enables detection of zero-hour phishing deployments, newly registered deceptive domains, and obfuscated login traps before they appear in global reputation feeds.
              </p>
            </div>

            <div className="about-highlights-column">
              <span className="highlights-title">System Characteristics</span>
              <ul className="highlights-list">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="highlight-item">
                    <CheckCircle2 size={15} className="highlight-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
