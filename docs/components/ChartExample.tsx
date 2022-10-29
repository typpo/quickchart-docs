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
  const sandboxUrl = `https://quickchart.io/sandbox#${encodeURIComponent(
    JSON.stringify({
      chart: displayCode,
      width: finalWidth,
      height: finalHeight,
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
            <CodeMirror
              height="100%"
              value={displayCode}
              onChange={handleCodeChange}
              extensions={[javascript({ jsx: true })]}
              theme={isDarkTheme ? 'dark' : 'light'}
            />
          </div>
        )}
        <div className={styles.chartContainer} style={{ maxWidth: finalWidth }}>
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
