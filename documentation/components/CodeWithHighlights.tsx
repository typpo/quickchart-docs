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
        marginBottom: 'var(--ifm-leading)',
        overflowX: 'auto',
        whiteSpace: wrap ? 'normal' : 'pre',
        overflowWrap: 'anywhere',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      <code>
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
