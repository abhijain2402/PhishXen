import React from 'react';
import Logo from './Logo';

export default function Navbar({ backendStatus, onScanClick }) {
  const isOnline = backendStatus?.status === 'healthy';

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="navbar-brand" aria-label="PhishXen Home">
          <Logo size={22} strokeColor="#171717" accentColor="#B89B5E" />
          <span className="brand-wordmark">PHISHXEN</span>
        </a>

        <ul className="navbar-nav">
          <li><a href="#top" className="nav-link">Home</a></li>
          <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
          <li><a href="#analysis" className="nav-link">Analysis</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
        </ul>

        <div className="navbar-actions">
          <div className="backend-pill" title={isOnline ? 'FastAPI Backend Online' : 'FastAPI Backend Offline'}>
            <div className={`backend-dot ${isOnline ? 'online' : 'offline'}`} />
            <span>{isOnline ? 'Backend Ready' : 'Offline'}</span>
          </div>

          <button
            type="button"
            className="btn-nav-cta"
            onClick={onScanClick}
          >
            Scan a URL
          </button>
        </div>
      </div>
    </nav>
  );
}
