import React from 'react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <Logo size={18} strokeColor="#171717" accentColor="#B89B5E" />
              <span className="footer-wordmark">PHISHXEN</span>
            </div>
            <p className="footer-tagline">
              AI-Powered URL Security & Webpage Intelligence.
            </p>
            <p className="footer-subtext">
              Engineered with calibrated XGBoost classification and real-time DOM feature extraction.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-nav-heading">Platform</span>
            <ul className="footer-nav-links">
              <li><a href="#scanner" className="footer-link">Scanner</a></li>
              <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
              <li><a href="#detection" className="footer-link">Detection</a></li>
              <li><a href="#history" className="footer-link">History</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span className="footer-copyright">
            © {new Date().getFullYear()} PhishXen. All rights reserved.
          </span>
          <div className="footer-status-pill">
            <span className="footer-status-dot" />
            <span>XGBoost V4 • 18 Signals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
