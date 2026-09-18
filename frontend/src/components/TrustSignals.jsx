import React from 'react';
import { ShieldCheck, Cpu, Zap, Server } from 'lucide-react';

const TECH_PILLARS = [
  {
    title: '18 Security Features',
    icon: ShieldCheck,
    tag: 'Signals Extracted',
    description: '6 lexical URL attributes, 8 webpage DOM elements, and 4 resource linkage metrics.',
  },
  {
    title: 'XGBoost Detection Model',
    icon: Cpu,
    tag: 'Machine Learning',
    description: 'Trained gradient-boosted decision tree classifier with calibrated decision boundaries.',
  },
  {
    title: 'Real-time URL Analysis',
    icon: Zap,
    tag: 'Live Inspection',
    description: 'Dynamic HTML parsing and lexical feature computation executed on every scan request.',
  },
  {
    title: 'FastAPI Backend',
    icon: Server,
    tag: 'Python Microservice',
    description: 'Low-latency API architecture serving instantaneous predictions with typed validation.',
  },
];

export default function TrustSignals() {
  return (
    <section className="tech-section" id="technology">
      <div className="container">
        <div className="tech-header">
          <div className="tech-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span>CORE ARCHITECTURE</span>
          </div>
          <h2 className="tech-heading">Grounded in Measurable Web Telemetry</h2>
          <p className="tech-subheading">
            PhishXen relies exclusively on deterministic feature extraction and verified machine-learning models.
          </p>
        </div>

        <div className="tech-pillars-grid">
          {TECH_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="tech-pillar-card">
                <div className="pillar-header-row">
                  <div className="pillar-icon-wrap">
                    <Icon size={18} />
                  </div>
                  <span className="pillar-tag">{pillar.tag}</span>
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
