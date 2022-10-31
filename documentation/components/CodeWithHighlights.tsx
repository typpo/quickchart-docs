import React from 'react';
import invariant from 'invariant';

interface CodeWithHighlightsProps {
  code: string;
  wrap?: boolean;
  centered?: boolean;
  children?: React.ReactNode;
}

export default function CodeWithHighlights({
  code,
  wrap,
  centered,
  children,
}: CodeWithHighlightsProps) {
  // Bolds the substrings that are surrounded by asterisks
  invariant(
    Number(typeof code !== 'undefined') ^ Number(typeof children !== 'undefined'),
    'CodeWithHighlights must have either a code prop or children',
  );

  let contents = children;
  if (code) {
    // TODO(ian): Get rid of this and just use the children prop
    const parts = code.split('**');
    contents = parts.map((part, i) => {
      if (i % 2 === 0) {
        return part;
      }
      return <strong>{part}</strong>;
    });
  }
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
      <code style={{ border: 'none', backgroundColor: 'transparent' }}>{contents}</code>
    </div>
  );
}
