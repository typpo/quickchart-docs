import React from 'react';
import Editor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

import styles from './ChartExample.module.css';

interface ChartExampleProps {
  config: string;
  width?: number;
  height?: number;
  alt?: string;
  version?: string;
  showSquashedUrl?: boolean;
  showEditor?: boolean;
}

let debounceTimer: ReturnType<typeof setTimeout>;

// TODO scroll instead of wrap code
// TODO set max height

export default function ChartExample({
  config,
  width,
  height,
  alt,
  version,
  showSquashedUrl,
  showEditor,
}: ChartExampleProps) {
  const [code, setCode] = React.useState<string>(config);
  const [displayCode, setDisplayCode] = React.useState<string>(config);

  const handleCodeChange = (newCode) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      setCode(newCode);
    }, 350);
    setDisplayCode(newCode);
  };

  const sandboxUrl = `https://quickchart.io/sandbox#${encodeURIComponent(
    JSON.stringify({
      chart: displayCode,
      width: width || 500,
      height: height || 300,
      version: version || '2.9.4',
    }),
  )}`;

  return (
    <div className={styles.container}>
      <div className={styles.columns}>
        {showSquashedUrl && (
          <>
            <div className={styles.codeContainer}>
              <code>
                &lt;img src="https://quickchart.io/chart?c=
                {config.replace(/[\s]/g, '').replace(/,}/g, '}').replace(/,]/g, ']')}"&gt;
              </code>
            </div>
            <div className={styles.arrowContainer}></div>
          </>
        )}
        {showEditor && (
          <div className={styles.editorContainer}>
            <Editor
              value={displayCode}
              onValueChange={handleCodeChange}
              padding={10}
              highlight={(code) => highlight(code, languages.js)}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          </div>
        )}
        <div className={styles.chartContainer}>
          <a href={sandboxUrl} rel="noopener noreferrer">
            <img
              loading="lazy"
              src={`https://quickchart.io/chart?c=${encodeURIComponent(code)}&v=${version}`}
              alt={alt}
            />
          </a>
        </div>
      </div>
      <p className={styles.editCta}>
        <a target="_blank" rel="noreferrer noopener" href={sandboxUrl}>
          {showEditor ? 'Edit chart in full editor' : 'Edit this chart'}
        </a>
      </p>
    </div>
  );
}
