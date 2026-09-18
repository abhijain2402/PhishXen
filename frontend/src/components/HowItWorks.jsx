import React from 'react';
import { ArrowRight, Link2, Cpu, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'ENTER URL',
    icon: Link2,
    description: 'Submit any website address to initiate instant, non-invasive threat telemetry.',
  },
  {
    number: '02',
    title: 'ANALYZE SIGNALS',
    icon: Cpu,
    description: 'PhishXen extracts 18 lexical, DOM structural, and asset-linking signals in real time.',
  },
  {
    number: '03',
    title: 'GET SECURITY VERDICT',
    icon: ShieldCheck,
    description: 'The XGBoost V4 engine evaluates feature vectors against a strict 60% decision boundary.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="how-header-row">
          <div className="how-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span>INSPECTION PIPELINE</span>
          </div>
          <h2 className="how-title">How PhishXen Works</h2>
          <p className="how-subtitle">
            A deterministic three-stage architecture designed for rapid, reproducible URL verification.
          </p>
        </div>

        <div className="how-steps-track">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="how-step-node">
                <div className="step-card-inner">
                  <div className="step-top-row">
                    <span className="step-index-num">{step.number}</span>
                    <div className="step-icon-bubble">
                      <Icon size={16} />
                    </div>
                  </div>

                  <h3 className="step-action-title">{step.title}</h3>
                  <p className="step-action-desc">{step.description}</p>
                </div>

                {idx < STEPS.length - 1 && (
                  <div className="step-connector-rail" aria-hidden="true">
                    <div className="step-connector-line" />
                    <ArrowRight size={14} className="step-connector-arrow" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
