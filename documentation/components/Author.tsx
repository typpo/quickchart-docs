import React from 'react';

import AuthorImage from '../images/authors/ianwebster.jpg';

import styles from './Author.module.css';

export default function Author() {
  return (
    <>
      <hr className={styles.hr} />
      <div>
        <div className={styles.authorFlexContainer}>
          <div className={styles.authorImgContainer}>
            <img src={AuthorImage} alt="Ian Webster" width={150} height={150} loading="lazy" />
          </div>
          <div className={styles.authorBio}>
            <h2>About the author</h2>
            <p>
              Ian Webster is a software engineer and former Googler based in San Mateo, California.
              He has helped Google, NASA, and governments around the world improve their data
              pipelines and visualizations. In 2018, Ian created QuickChart, a collection of
              open-source APIs that support data visualization efforts.
            </p>
            <p>
              <a href="mailto:ian@quickchart.io">Email</a> &middot;{' '}
              <a href="https://www.linkedin.com/in/ianww/">LinkedIn</a> &middot;{' '}
              <a href="https://twitter.com/iwebst">Twitter</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
