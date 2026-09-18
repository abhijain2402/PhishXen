import React from 'react';
import { Layers, FileCode, Network, Link, Code2, CheckCircle2, MinusCircle, Hash } from 'lucide-react';

const FEATURE_CATEGORIES = [
  {
    category: 'URL SIGNALS',
    description: 'Lexical and syntactic attributes derived directly from the URL string',
    icon: Link,
    features: [
      { key: 'DomainLength', label: 'Domain Length', type: 'number' },
      { key: 'NoOfDegitsInURL', label: 'Digits in URL', type: 'number' },
      { key: 'DegitRatioInURL', label: 'Digit Ratio', type: 'ratio' },
      { key: 'NoOfOtherSpecialCharsInURL', label: 'Special Characters', type: 'number' },
      { key: 'SpacialCharRatioInURL', label: 'Special Character Ratio', type: 'ratio' },
      { key: 'IsHTTPS', label: 'HTTPS', type: 'boolean' },
    ],
  },
  {
    category: 'PAGE STRUCTURE',
    description: 'Structural HTML elements and metadata inspected in the live DOM',
    icon: FileCode,
    features: [
      { key: 'LineOfCode', label: 'Lines of Code', type: 'number' },
      { key: 'HasFavicon', label: 'Favicon', type: 'boolean' },
      { key: 'IsResponsive', label: 'Responsive', type: 'boolean' },
      { key: 'HasDescription', label: 'Description', type: 'boolean' },
      { key: 'HasSocialNet', label: 'Social Network', type: 'boolean' },
      { key: 'HasSubmitButton', label: 'Submit Button', type: 'boolean' },
      { key: 'HasHiddenFields', label: 'Hidden Fields', type: 'boolean' },
      { key: 'HasCopyrightInfo', label: 'Copyright', type: 'boolean' },
    ],
  },
  {
    category: 'RESOURCE & LINK ANALYSIS',
    description: 'Static assets and hyperlink topology discovered across the page',
    icon: Network,
    features: [
      { key: 'NoOfCSS', label: 'CSS', type: 'number' },
      { key: 'NoOfJS', label: 'JavaScript', type: 'number' },
      { key: 'NoOfSelfRef', label: 'Self References', type: 'number' },
      { key: 'NoOfExternalRef', label: 'External References', type: 'number' },
    ],
  },
];

export default function FeatureAnalysis({ features }) {
  if (!features || Object.keys(features).length === 0) return null;

  const renderValueDisplay = (item, rawVal) => {
    if (rawVal === undefined || rawVal === null) {
      return (
        <div className="feature-val-group">
          <span className="feature-empty-val">—</span>
        </div>
      );
    }

    if (item.type === 'boolean') {
      const isTrue = Number(rawVal) === 1;
      return (
        <div className="feature-val-group">
          <span className={`feature-pill-badge ${isTrue ? 'badge-detected' : 'badge-not-detected'}`}>
            <span className={`pill-indicator-dot ${isTrue ? 'dot-active' : 'dot-inactive'}`} />
            <span>{isTrue ? 'Detected / Yes' : 'Not detected / No'}</span>
          </span>
          <span className="feature-raw-code">({rawVal})</span>
        </div>
      );
    }

    if (item.type === 'ratio') {
      const numericVal = Number(rawVal);
      return (
        <div className="feature-val-group">
          <span className="feature-numeric-val">{numericVal.toFixed(3)}</span>
          <span className="feature-unit-tag">ratio</span>
        </div>
      );
    }

    // Standard number
    const numericVal = Number(rawVal);
    return (
      <div className="feature-val-group">
        <span className="feature-numeric-val">{numericVal.toLocaleString()}</span>
        <span className="feature-unit-tag">count</span>
      </div>
    );
  };

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="features-intro-bar">
          <div className="features-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span>XGBOOST FEATURE EXTRACTION MATRIX</span>
          </div>
          <h2 className="features-main-title">18 Security Features Analyzed</h2>
          <p className="features-subtitle">
            Comprehensive evaluation of lexical URL patterns, DOM structure, and linked resources.
          </p>
        </div>

        <div className="feature-groups-vertical">
          {FEATURE_CATEGORIES.map((catGroup) => {
            const GroupIcon = catGroup.icon;

            return (
              <div key={catGroup.category} className="feature-category-block">
                <div className="category-header-row">
                  <div className="category-title-wrap">
                    <div className="category-icon-box">
                      <GroupIcon size={16} />
                    </div>
                    <div>
                      <h3 className="category-name">{catGroup.category}</h3>
                      <p className="category-desc">{catGroup.description}</p>
                    </div>
                  </div>
                  <span className="category-count-badge">
                    {catGroup.features.length} Signals
                  </span>
                </div>

                {/* Compact Grid of Feature Cards */}
                <div className="feature-cards-grid">
                  {catGroup.features.map((feat) => {
                    const val = features[feat.key];
                    return (
                      <div key={feat.key} className="feature-item-card">
                        <div className="feature-card-top">
                          <span className="feature-name">{feat.label}</span>
                          <span className="feature-key-mono">{feat.key}</span>
                        </div>
                        <div className="feature-card-bottom">
                          {renderValueDisplay(feat, val)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
