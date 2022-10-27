import React from 'react';

// Bolds the substrings that are surrounded by asterisks
export default function CodeWithHighlights({ code }: { code: string }) {
  const parts = code.split('**');
  return (
    <div style={{ marginBottom: 'var(--ifm-leading)', overflowX: 'auto', whiteSpace: 'pre' }}>
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
