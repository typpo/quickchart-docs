import React from 'react';

// Bolds the substrings that are surrounded by asterisks
export default function CodeWithHighlights({ code, wrap }: { code: string; wrap?: boolean }) {
  const parts = code.split('**');
  return (
    <div
      style={{
        marginBottom: 'var(--ifm-leading)',
        overflowX: 'auto',
        whiteSpace: wrap ? 'normal' : 'pre',
        overflowWrap: 'anywhere',
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
