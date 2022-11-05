import React from 'react';
import invariant from 'invariant';

interface CodeWithHighlightsProps {
  code: string;
  wrap?: boolean;
  centered?: boolean;
  link?: string;
  children?: React.ReactNode;
}

export default function CodeWithHighlights({
  code,
  wrap,
  centered,
  link,
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
  if (link) {
    contents = (
      <a target="_blank" rel="noreferrer noopener" href={link}>
        {contents}
      </a>
    );
  }
  return (
    <div
      style={{
        backgroundColor: 'var(--ifm-code-background)',
        marginBottom: 'var(--ifm-leading)',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      <pre
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          padding: '2rem 0.5rem',
          overflowX: 'auto',
          overflowWrap: 'anywhere',
          whiteSpace: wrap ? 'normal' : 'pre',
        }}
      >
        {contents}
      </pre>
    </div>
  );
}
