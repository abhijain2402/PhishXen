import React from 'react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Logo size={18} strokeColor="#171717" accentColor="#B89B5E" />
            <span className="footer-brand-name">PHISHXEN</span>
          </div>
          <p className="footer-tagline">AI-powered phishing URL detection.</p>
          <p className="footer-notice">Built for cybersecurity research and threat awareness.</p>
        </div>

        <ul className="footer-links">
          <li><a href="#top" className="footer-link">Home</a></li>
          <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
          <li><a href="#analysis" className="footer-link">Analysis</a></li>
          <li><a href="#about" className="footer-link">About</a></li>
        </ul>
      </div>
    </footer>
  );
}
