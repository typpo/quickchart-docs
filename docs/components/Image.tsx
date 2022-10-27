import React from 'react';

import styles from './Image.module.css';

interface ImageProps {
  src: string;
  alt?: string;
  caption?: string;
  maxWidth?: number;
}

export default function Image({ src, alt, caption, maxWidth }: ImageProps) {
  return (
    <div className={styles.container}>
      <img loading="lazy" src={src} alt={alt} style={{ maxWidth }} />
      <div className={styles.caption}>{caption}</div>
    </div>
  );
}
