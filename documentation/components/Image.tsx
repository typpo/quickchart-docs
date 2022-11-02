import React from 'react';

import styles from './Image.module.css';

interface ImageProps {
  src: string;
  alt?: string;
  caption?: string;
  maxWidth?: number;
  noBorder?: boolean;
  dropShadow?: boolean;
}

export default function Image({ src, alt, caption, maxWidth, noBorder, dropShadow }: ImageProps) {
  return (
    <div
      className={`${styles.container} ${noBorder ? styles.noBorder : ''} ${
        dropShadow ? styles.dropShadow : ''
      }`}
    >
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img loading="lazy" src={src} alt={alt} style={{ maxWidth: `min(100%, ${maxWidth}px)` }} />
      </a>
      <div className={styles.caption}>{caption}</div>
    </div>
  );
}
