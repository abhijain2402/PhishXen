import React from 'react';

const FEATURE_GROUPS = [
  {
    title: 'URL Lexical',
    count: '6 Signals',
    features: [
      { key: 'DomainLength', label: 'Domain Length', type: 'number' },
      { key: 'NoOfDegitsInURL', label: 'Digits in URL', type: 'number' },
      { key: 'DegitRatioInURL', label: 'Digit Ratio', type: 'ratio' },
      { key: 'NoOfOtherSpecialCharsInURL', label: 'Special Characters', type: 'number' },
      { key: 'SpacialCharRatioInURL', label: 'Special Character Ratio', type: 'ratio' },
      { key: 'IsHTTPS', label: 'HTTPS Protocol', type: 'boolean' },
    ],
  },
  {
    title: 'HTML Structure',
    count: '8 Signals',
    features: [
      { key: 'LineOfCode', label: 'Lines of Code', type: 'number' },
      { key: 'HasFavicon', label: 'Favicon Present', type: 'boolean' },
      { key: 'IsResponsive', label: 'Responsive Viewport', type: 'boolean' },
      { key: 'HasDescription', label: 'Meta Description', type: 'boolean' },
      { key: 'HasSocialNet', label: 'Social Network Links', type: 'boolean' },
      { key: 'HasSubmitButton', label: 'Submit Button', type: 'boolean' },
      { key: 'HasHiddenFields', label: 'Hidden Form Fields', type: 'boolean' },
      { key: 'HasCopyrightInfo', label: 'Copyright Notice', type: 'boolean' },
    ],
  },
  {
    title: 'Resources & References',
    count: '4 Signals',
    features: [
      { key: 'NoOfCSS', label: 'CSS Stylesheets', type: 'number' },
      { key: 'NoOfJS', label: 'JavaScript Scripts', type: 'number' },
      { key: 'NoOfSelfRef', label: 'Internal References', type: 'number' },
      { key: 'NoOfExternalRef', label: 'External References', type: 'number' },
    ],
  },
];

export default function FeatureAnalysis({ features }) {
  if (!features || Object.keys(features).length === 0) return null;

  const formatValue = (featureDef, rawVal) => {
    if (rawVal === undefined || rawVal === null) return '—';

    if (featureDef.type === 'boolean') {
      const isTrue = Number(rawVal) === 1;
      return (
        <span className={isTrue ? 'signal-badge-yes' : 'signal-badge-no'}>
          {isTrue ? 'Yes' : 'No'}
        </span>
      );
    }

    if (featureDef.type === 'ratio') {
      return `${(Number(rawVal) * 100).toFixed(1)}%`;
    }

    return Number(rawVal).toLocaleString();
  };

  return (
    <section className="signals-section" id="analysis">
      <div className="container">
        <div className="section-intro">
          <h2 className="section-title">18 Signals Behind the Verdict</h2>
          <p className="section-description">
            PhishXen evaluates 18 URL and webpage characteristics before generating the final classification.
          </p>
        </div>

        <div className="signals-groups-grid">
          {FEATURE_GROUPS.map((group) => (
            <div key={group.title} className="signals-card">
              <div className="signals-group-header">
                <span className="signals-group-title">{group.title}</span>
                <span className="signals-count-tag">{group.count}</span>
              </div>

              <div className="signals-list">
                {group.features.map((feat) => (
                  <div key={feat.key} className="signal-row">
                    <span className="signal-label">{feat.label}</span>
                    <span className="signal-val">
                      {formatValue(feat, features[feat.key])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
