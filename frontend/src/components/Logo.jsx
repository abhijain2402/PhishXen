import React from 'react';

/**
 * Premium minimalist geometric shield mark with an integrated subtle 'X' motif.
 */
export default function Logo({ size = 22, strokeColor = '#171717', accentColor = '#B89B5E', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Sleek Shield */}
      <path
        d="M12 2.5L4.5 5.5V11.5C4.5 16.5 7.7 20.9 12 22C16.3 20.9 19.5 16.5 19.5 11.5V5.5L12 2.5Z"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Subtle Inner Intersection Accent (X motif) */}
      <path
        d="M8.5 9L15.5 15"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5 9L8.5 15"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
}
