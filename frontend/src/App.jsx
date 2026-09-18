import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Scanner from './components/Scanner';
import Verdict from './components/Verdict';
import FeatureAnalysis from './components/FeatureAnalysis';
import HowItWorks from './components/HowItWorks';
import TrustSignals from './components/TrustSignals';
import ScanHistory from './components/ScanHistory';
import About from './components/About';
import Footer from './components/Footer';

import { checkBackendHealth, predictUrl } from './services/api';

const STORAGE_KEY = 'phishxen_recent_scans';

export default function App() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState(null);

  const scannerInputRef = useRef(null);

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Health ping on mount and periodically
  useEffect(() => {
    const fetchHealth = async () => {
      const status = await checkBackendHealth();
      setBackendStatus(status);
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  }, [history]);

  // Scroll to scanner & focus input
  const handleScrollToScanner = () => {
    const scannerEl = document.getElementById('scanner');
    if (scannerEl) {
      scannerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        scannerInputRef.current?.focus();
      }, 350);
    }
  };

  // Perform scan
  const handleScan = async (targetUrl) => {
    setError(null);
    setIsScanning(true);

    try {
      const data = await predictUrl(targetUrl);
      setResult(data);

      // Save to recent scans history (keep top 8 items)
      setHistory((prev) => {
        const filtered = prev.filter(
          (item) => item.url.toLowerCase() !== data.url.toLowerCase()
        );
        return [
          {
            url: data.url,
            prediction: data.prediction,
            confidence: data.confidence,
            risk: data.risk,
            probabilities: data.probabilities,
            features: data.features,
            timestamp: new Date().toISOString(),
          },
          ...filtered,
        ].slice(0, 8);
      });

      // Scroll smoothly to verdict detection dashboard
      setTimeout(() => {
        const verdictEl = document.getElementById('detection');
        if (verdictEl) {
          verdictEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } catch (err) {
      setError(err.message || 'Unable to analyze this website.');
    } finally {
      setIsScanning(false);
    }
  };

  // Re-select history item
  const handleSelectHistory = (item) => {
    setUrl(item.url);
    setResult(item);
    setError(null);

    setTimeout(() => {
      const verdictEl = document.getElementById('detection');
      if (verdictEl) {
        verdictEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Clear history
  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <div className="app-wrapper">
      <Navbar
        backendStatus={backendStatus}
        onScanClick={handleScrollToScanner}
      />

      <main className="main-content">
        {/* 1. Hero Section */}
        <Hero onScanClick={handleScrollToScanner} />

        {/* 2. Main Product Feature: Scanner */}
        <Scanner
          url={url}
          setUrl={setUrl}
          onScan={handleScan}
          isScanning={isScanning}
          error={error}
          inputRef={scannerInputRef}
        />

        {/* 3. Security Analysis Verdict Dashboard */}
        {result && <Verdict result={result} />}

        {/* 4. 18 Security Features Analysis */}
        {result && <FeatureAnalysis features={result.features} />}

        {/* 5. How It Works Pipeline */}
        <HowItWorks />

        {/* 6. Measurable Trust / Technology Section */}
        <TrustSignals />

        {/* 7. Local Scan History */}
        <ScanHistory
          history={history}
          onSelect={handleSelectHistory}
          onClear={handleClearHistory}
        />

        {/* 8. Technical Methodology / About */}
        <About />
      </main>

      {/* 9. Minimal Footer */}
      <Footer />
    </div>
  );
}
