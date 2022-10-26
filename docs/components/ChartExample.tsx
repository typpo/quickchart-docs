import React from 'react';

import styles from './ChartExample.module.css';

interface ChartExampleProps {
  config: string;
  width?: number;
  height?: number;
  alt?: string;
  version?: string;
}

export default function ChartExample({ config, width, height, alt, version }: ChartExampleProps) {
  const sandboxUrl = `https://quickchart.io/sandbox#${encodeURIComponent(
    JSON.stringify({
      chart: config,
      width: width || 500,
      height: height || 300,
      version: version || '2.9.4',
    }),
  )}`;
  return (
    <div className={styles.container}>
      <a href={sandboxUrl} rel="noopener noreferrer">
        <img src={`https://quickchart.io/chart?c=${encodeURIComponent(config)}`} alt={alt} />
      </a>
      <p className={styles.editCta}>
        <a href={sandboxUrl}>Edit this chart</a>
      </p>
    </div>
  );
}
