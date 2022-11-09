import React from 'react';

import styles from './GoogleImageChartsTutorialCallout.module.css';

export default function GoogleImageChartsTutorialCallout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.container}>{children}</div>;
}
