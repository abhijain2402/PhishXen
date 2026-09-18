import React from 'react';
import { ArrowDown, ShieldCheck, Cpu, Activity } from 'lucide-react';

export default function Hero({ onScanClick }) {
  return (
    <section className="hero-section" id="top">
      <div className="container hero-container">
        {/* Main Content Column */}
        <div className="hero-content">
          <div className="hero-eyebrow-pill">
            <span className="eyebrow-dot" />
            <span className="eyebrow-text">AI-POWERED URL SECURITY</span>
          </div>

          <h1 className="hero-heading">
            Know Before<br />
            <span className="hero-heading-gradient">You Click.</span>
          </h1>

          <p className="hero-subtext">
            PhishXen analyzes suspicious URLs using machine-learning and webpage intelligence to identify potential phishing threats.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onScanClick}
            >
              <span>Analyze a URL</span>
              <ArrowDown size={15} className="hero-btn-icon" />
            </button>

            <a href="#how-it-works" className="link-hero-secondary">
              <span>Explore detection pipeline</span>
              <span className="arrow-affordance">→</span>
            </a>
          </div>

          {/* Micro trust badges */}
          <div className="hero-micro-signals">
            <div className="micro-signal-item">
              <ShieldCheck size={14} className="micro-icon" />
              <span>18 Deep Webpage Signals</span>
            </div>
            <div className="micro-signal-divider" />
            <div className="micro-signal-item">
              <Cpu size={14} className="micro-icon" />
              <span>XGBoost V4 Model</span>
            </div>
            <div className="micro-signal-divider" />
            <div className="micro-signal-item">
              <Activity size={14} className="micro-icon" />
              <span>Real-time DOM Extraction</span>
            </div>
          </div>
        </div>

        {/* Minimal Sophisticated Technical Visual Graphic */}
        <div className="hero-visual-wrapper">
          <div className="hero-telemetry-card">
            <div className="telemetry-card-header">
              <div className="telemetry-header-left">
                <span className="telemetry-radar-dot" />
                <span className="telemetry-title">NEURAL THREAT TELEMETRY</span>
              </div>
              <span className="telemetry-version">V4.2 ACTIVE</span>
            </div>

            <div className="telemetry-visual-core">
              <svg
                className="telemetry-svg"
                viewBox="0 0 280 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Precision Grid Lines */}
                <line x1="20" y1="55" x2="260" y2="55" stroke="#EAE8E0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="110" x2="260" y2="110" stroke="#E3E1DA" strokeWidth="1" />
                <line x1="20" y1="165" x2="260" y2="165" stroke="#EAE8E0" strokeWidth="1" strokeDasharray="3 3" />

                <line x1="80" y1="20" x2="80" y2="200" stroke="#EAE8E0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="140" y1="20" x2="140" y2="200" stroke="#E3E1DA" strokeWidth="1" />
                <line x1="200" y1="20" x2="200" y2="200" stroke="#EAE8E0" strokeWidth="1" strokeDasharray="3 3" />

                {/* Subtle Concentric Rings */}
                <circle cx="140" cy="110" r="85" stroke="#ECEAE4" strokeWidth="1" />
                <circle cx="140" cy="110" r="55" stroke="#E3E1DA" strokeWidth="1" strokeDasharray="4 2" />
                <circle cx="140" cy="110" r="28" stroke="#DCD8CD" strokeWidth="1" />

                {/* Minimal Shield Silhouette */}
                <path
                  d="M140 68L104 84V115C104 140 120 162 140 170C160 162 176 140 176 115V84L140 68Z"
                  stroke="#171717"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Champagne Gold Crosshair Accent */}
                <line x1="126" y1="110" x2="154" y2="110" stroke="#B89B5E" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="140" y1="96" x2="140" y2="124" stroke="#B89B5E" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="140" cy="110" r="3" fill="#B89B5E" />

                {/* Data Points */}
                <circle cx="95" cy="85" r="3" fill="#187A68" />
                <circle cx="185" cy="140" r="3" fill="#B89B5E" />
                <circle cx="195" cy="75" r="2.5" fill="#171717" opacity="0.6" />
                <circle cx="85" cy="145" r="2.5" fill="#171717" opacity="0.6" />
              </svg>
            </div>

            <div className="telemetry-footer-stats">
              <div className="telemetry-stat">
                <span className="stat-num">18</span>
                <span className="stat-lbl">Signals</span>
              </div>
              <div className="telemetry-stat">
                <span className="stat-num">60%</span>
                <span className="stat-lbl">Boundary</span>
              </div>
              <div className="telemetry-stat">
                <span className="stat-num">100%</span>
                <span className="stat-lbl">Deterministic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
