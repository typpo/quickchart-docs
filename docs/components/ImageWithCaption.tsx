import React from 'react';

import styles from './ImageWithCaption.module.css';

interface ImageWithCaptionProps {
  src: string;
  caption: string;
  alt: string;
}

export default function ImageWithCaption({ src, alt, caption }: ImageWithCaptionProps) {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} />
      <p>{caption}</p>
    </div>
  );
}
