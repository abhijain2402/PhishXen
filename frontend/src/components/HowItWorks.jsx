import React from 'react';

const STEPS = [
  {
    number: '01',
    title: 'URL',
    description: 'The URL is analyzed for structural and lexical characteristics.',
  },
  {
    number: '02',
    title: 'WEBPAGE',
    description: 'The live webpage is inspected for HTML and resource signals.',
  },
  {
    number: '03',
    title: 'XGBOOST',
    description: 'The extracted 18 features are evaluated by the existing XGBoost V4 model.',
  },
  {
    number: '04',
    title: 'VERDICT',
    description: 'PhishXen returns LEGITIMATE or PHISHING with confidence and risk level.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works">
      <div className="container">
        <div className="section-intro">
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">
            A linear analysis pipeline from raw input to machine-learning classification.
          </p>
        </div>

        <div className="steps-grid">
          {STEPS.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-num">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
