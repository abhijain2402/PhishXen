import React, { useRef } from 'react';
import { Link2, ArrowRight, AlertCircle } from 'lucide-react';

const QUICK_TESTS = [
  { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'StackOverflow', url: 'https://stackoverflow.com' },
];

export default function Scanner({ url, setUrl, onScan, isScanning, error, inputRef }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isScanning) return;
    onScan(url);
  };

  const handleQuickTest = (testUrl) => {
    setUrl(testUrl);
    onScan(testUrl);
  };

  return (
    <section className="scanner-section" id="scanner">
      <div className="container">
        <div className="scanner-container">
          <div className="scanner-header">
            <h2 className="scanner-title">Check a website</h2>
            <p className="scanner-subtext">
              Enter a URL and PhishXen will analyze its security signals.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="scanner-form-box">
              <Link2 size={18} className="scanner-icon" />

              <input
                ref={inputRef}
                type="text"
                className="scanner-input"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isScanning}
                autoComplete="off"
                spellCheck="false"
                aria-label="Website URL to scan"
              />

              <button
                type="submit"
                className="btn-scan"
                disabled={isScanning}
              >
                <span>{isScanning ? 'Analyzing...' : 'Scan URL'}</span>
                {!isScanning && <ArrowRight size={15} />}
              </button>
            </div>
          </form>

          {/* Quick Tests Row */}
          <div className="quick-test-row">
            <span className="quick-test-label">Quick test:</span>
            {QUICK_TESTS.map((item) => (
              <button
                key={item.name}
                type="button"
                className="btn-quick-chip"
                onClick={() => handleQuickTest(item.url)}
                disabled={isScanning}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Scanning In-Progress Indicator */}
          {isScanning && (
            <div className="scanning-indicator">
              <div className="scanning-spinner" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Inspecting DOM signals and evaluating XGBoost V4 features...
              </span>
            </div>
          )}

          {/* Error Notice */}
          {error && !isScanning && (
            <div className="scan-error-alert" role="alert">
              <AlertCircle size={17} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
