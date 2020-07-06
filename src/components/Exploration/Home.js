import React, { useRef, useCallback, useEffect } from 'react';
import Head from 'next/head';

import styles from './Home.module.scss';

function Home(props) {
  return (
    <section className={styles.Root}>
      <h1>EXPLORATION</h1>
    </section>
  );
}

export default Home;