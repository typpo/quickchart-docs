import React from 'react';

// Bolds the substrings that are surrounded by asterisks
export default function CodeWithHighlights({
  code,
  wrap,
  centered,
}: {
  code: string;
  wrap?: boolean;
  centered?: boolean;
}) {
  const parts = code.split('**');
  return (
    <div
      style={{
        backgroundColor: 'var(--ifm-code-background)',
        marginBottom: 'var(--ifm-leading)',
        padding: '2rem 0.5rem',
        overflowX: 'auto',
        whiteSpace: wrap ? 'normal' : 'pre',
        overflowWrap: 'anywhere',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      <code style={{ border: 'none', backgroundColor: 'transparent' }}>
        {parts.map((part, i) => {
          if (i % 2 === 0) {
            return part;
          }
          return <strong>{part}</strong>;
        })}
      </code>
    </div>
  );
}
