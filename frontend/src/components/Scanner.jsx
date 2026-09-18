import React from 'react';
import { Search, Loader2, ArrowRight, AlertTriangle, Globe, Sparkles } from 'lucide-react';

const QUICK_TESTS = [
  { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'StackOverflow', url: 'https://stackoverflow.com' },
];

export default function Scanner({ url, setUrl, onScan, isScanning, error, inputRef }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isScanning || !url.trim()) return;
    onScan(url);
  };

  const handleQuickSelect = (quickUrl) => {
    setUrl(quickUrl);
    onScan(quickUrl);
  };

  return (
    <section className="scanner-section" id="scanner">
      <div className="container">
        <div className="scanner-card">
          {/* Subtle top decorative scanner line */}
          <div className="scanner-card-accent-line" />

          <div className="scanner-header-block">
            <div className="scanner-badge">
              <Sparkles size={13} className="scanner-badge-icon" />
              <span>Real-time URL Inspector</span>
            </div>
            <h2 className="scanner-title">Analyze a URL</h2>
            <p className="scanner-description">
              Enter a website URL to check its security.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="scanner-form">
            <div className={`scanner-input-container ${isScanning ? 'is-scanning-active' : ''}`}>
              <div className="input-prefix-icon">
                <Globe size={18} />
              </div>

              <input
                ref={inputRef}
                type="text"
                className="scanner-url-input"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isScanning}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Website URL to analyze"
              />

              <button
                type="submit"
                className="btn-analyze-url"
                disabled={isScanning || !url.trim()}
                aria-label="Analyze URL"
              >
                {isScanning ? (
                  <>
                    <Loader2 size={16} className="btn-spinner" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze URL</span>
                    <ArrowRight size={15} className="btn-arrow-icon" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Test Links */}
          <div className="scanner-quick-tests">
            <span className="quick-test-heading">Sample targets:</span>
            <div className="quick-test-pills">
              {QUICK_TESTS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="quick-pill"
                  onClick={() => handleQuickSelect(item.url)}
                  disabled={isScanning}
                >
                  <span className="quick-pill-dot" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Scanning In-Progress Radar Animation */}
          {isScanning && (
            <div className="scanner-in-progress-card" role="status" aria-live="polite">
              <div className="scanning-radar-beam" />
              <div className="scanning-feedback">
                <div className="scanning-pulse-ring" />
                <div className="scanning-text-group">
                  <span className="scanning-primary-msg">Extracting live DOM & lexical security signals...</span>
                  <span className="scanning-sub-msg">Fetching URL headers, evaluating 18 features via XGBoost classifier</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && !isScanning && (
            <div className="scanner-error-card" role="alert">
              <AlertTriangle size={18} className="error-icon" />
              <div className="error-content">
                <span className="error-title">Analysis Failed</span>
                <p className="error-desc">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
