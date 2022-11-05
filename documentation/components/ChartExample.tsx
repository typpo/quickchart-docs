import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useColorMode } from '@docusaurus/theme-common';

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
  const { isDarkTheme } = useColorMode();
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

  const finalWidth = width || 500;
  const finalHeight = height || 300;
  const finalVersion = version || '2.9.4';
  const sandboxUrl = `https://quickchart.io/sandbox#${encodeURIComponent(
    JSON.stringify({
      chart: displayCode,
      width: finalWidth,
      height: finalHeight,
      version: finalVersion,
    }),
  )}`;

  const imageUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
    code,
  )}&v=${finalVersion}&w=${finalWidth}&h=${finalHeight}`;
  const truncatedImageUrl =
    `https://quickchart.io/chart?c=${code.replace(/\/\/.*$/gm, '').replace(/\n/g, '')}`.substring(
      0,
      165,
    ) + '...';
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
            <CodeMirror
              height="100%"
              value={displayCode}
              onChange={handleCodeChange}
              extensions={[javascript({ jsx: true })]}
              theme={isDarkTheme ? 'dark' : 'light'}
            />
          </div>
        )}
        <div className={styles.chartContainer}>
          {showEditor && (
            <div className={styles.chartUrl}>
              Chart URL:{' '}
              <a target="_blank" rel="noopener noreferrer" href={imageUrl}>
                {truncatedImageUrl}
              </a>
            </div>
          )}
          <a href={sandboxUrl} rel="noopener noreferrer">
            <img
              loading="lazy"
              src={imageUrl}
              alt={alt}
              style={{
                maxWidth: `min(${finalWidth}px, 100%)`,
                maxHeight: `min(${finalHeight}px, 100%)`,
              }}
            />
          </a>
        </div>
      </div>
      <p className={styles.editCta}>
        <a target="_blank" rel="noreferrer noopener" href={sandboxUrl}>
          {showEditor ? 'Open in full editor' : 'Edit this example'}
        </a>
      </p>
    </div>
  );
}
