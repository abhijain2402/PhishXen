import React from 'react';

/**
 * Minimalist geometric shield logo with an integrated subtle 'X' motif.
 */
export default function Logo({ size = 24, strokeColor = '#171717', accentColor = '#B89B5E', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PhishXen Logo"
    >
      {/* Outer Geometric Shield */}
      <path
        d="M16 3L6 7V15C6 21.5 10.3 27.2 16 29C21.7 27.2 26 21.5 26 15V7L16 3Z"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Subtle Inner Intersection / X Element */}
      <path
        d="M11 11.5L21 20.5"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M21 11.5L11 20.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
    </svg>
  );
}
