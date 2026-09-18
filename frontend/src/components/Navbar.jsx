import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ backendStatus, onScanClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOnline = backendStatus?.status === 'healthy';

  const navLinks = [
    { label: 'Scanner', href: '#scanner' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Detection', href: '#detection' },
    { label: 'History', href: '#history' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand */}
        <a href="#top" className="navbar-brand" aria-label="PhishXen Home">
          <div className="brand-logo-mark">
            <Logo size={20} strokeColor="#171717" accentColor="#B89B5E" />
          </div>
          <span className="brand-wordmark">PHISHXEN</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-nav" aria-label="Primary Navigation">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              onClick={handleLinkClick}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Side: Protected by XGBoost */}
        <div className="navbar-actions">
          <div
            className="protected-badge"
            title={isOnline ? 'Active Protection • FastAPI & XGBoost V4 Online' : 'Connecting to XGBoost engine...'}
          >
            <Shield size={13} className="protected-shield-icon" />
            <span className="protected-text">Protected by XGBoost</span>
            <span
              className={`status-pulse-dot ${isOnline ? 'status-online' : 'status-pending'}`}
              aria-label={isOnline ? 'Backend Online' : 'Backend Connecting'}
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <div className="container mobile-drawer-inner">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-nav-link"
                onClick={handleLinkClick}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
