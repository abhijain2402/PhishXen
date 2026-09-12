import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onScanClick }) {
  return (
    <section className="hero-section" id="top">
      <div className="container hero-grid">
        {/* Left Column: Typography & CTAs */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span>AI-POWERED PHISHING DETECTION</span>
          </div>

          <h1 className="hero-heading">
            Know Before<br />You Click.
          </h1>

          <p className="hero-subtext">
            Analyze a website URL using machine-learning-powered URL and webpage signals to identify potential phishing threats.
          </p>

          <div className="hero-ctas">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onScanClick}
            >
              <span>Scan a URL</span>
              <ArrowRight size={16} />
            </button>

            <a href="#how-it-works" className="link-hero-secondary">
              <span>See how it works</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Minimal Abstract Security Visual */}
        <div className="hero-visual-card">
          <svg
            className="hero-svg-art"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Subtle Circular Radial Guides */}
            <circle cx="120" cy="120" r="95" stroke="#E3E1DA" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="120" cy="120" r="70" stroke="#E3E1DA" strokeWidth="1" />

            {/* Subtle Grid Axes */}
            <line x1="120" y1="20" x2="120" y2="220" stroke="#ECEAE4" strokeWidth="1" />
            <line x1="20" y1="120" x2="220" y2="120" stroke="#ECEAE4" strokeWidth="1" />

            {/* Primary Thin Geometric Shield Outline */}
            <path
              d="M120 45L60 70V120C60 162 86 198 120 210C154 198 180 162 180 120V70L120 45Z"
              stroke="#171717"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner Concentric Shield Line */}
            <path
              d="M120 62L75 81V120C75 152 94 180 120 190C146 180 165 152 165 120V81L120 62Z"
              stroke="#B89B5E"
              strokeWidth="1.25"
              strokeOpacity="0.8"
              strokeDasharray="4 2"
            />

            {/* Subtle Center X Motif */}
            <line x1="102" y1="102" x2="138" y2="138" stroke="#B89B5E" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="138" y1="102" x2="102" y2="138" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.75" />

            {/* Center Anchor Point */}
            <circle cx="120" cy="120" r="2.5" fill="#171717" />
          </svg>

          <span className="hero-visual-caption">
            XGBoost V4 • 18 Webpage Signals
          </span>
        </div>
      </div>
    </section>
  );
}
