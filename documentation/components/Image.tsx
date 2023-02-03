import React from 'react';

import styles from './Image.module.css';

interface ImageProps {
  src: string;
  alt?: string;
  href?: string;
  caption?: string;
  maxWidth?: number;
  noBorder?: boolean;
  dropShadow?: boolean;
  noLazyLoad?: boolean;
}

export default function Image({
  src,
  href,
  alt,
  caption,
  maxWidth,
  noBorder,
  noLazyLoad,
  dropShadow,
}: ImageProps) {
  return (
    <div
      className={`${styles.container} ${noBorder ? styles.noBorder : ''} ${
        dropShadow ? styles.dropShadow : ''
      }`}
    >
      <a href={href || src} target="_blank" rel="noopener noreferrer">
        <img
          loading={noLazyLoad ? 'eager' : 'lazy'}
          src={src}
          alt={alt || caption}
          width={maxWidth}
        />
      </a>
      <div className={styles.caption}>{caption}</div>
    </div>
  );
}
