import React, { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import _ from 'underscore';
import styles from './Home.module.scss';

function Home(props) {
  const titleRef = useRef();
  const stars = [];
  const starRefs = useRef([]);

  const animateTitle = useCallback(async () => {
    gsap.to(titleRef.current, { duration: 0.5, fontSize: 130, color: 'wheat', delay: 1.2 });
  }, []);

  useEffect(() => {
    animateTitle();
  }, [animateTitle])

  const animateStars = useCallback(async () => {
    for (var i = 0; i < starRefs.current.length; i++) {
      gsap.timeline({ repeat: -1, yoyo: true })
        .to(starRefs.current[i], {
          duration: 0.75 + Math.random() * (5 - 0.75),
          width: 9 + Math.random() * (12 - 9),
          height: 9 + Math.random() * (12 - 9),
          opacity: 0.1 + Math.random() * (1 - 0.1),
        });
    }

    // gsap.timeline({ repeat: -1, yoyo: true })
    //   .to(starRefs.current, {
    //     duration: 0.05 + Math.random() * (10 - 0.05),
    //     width: 9 + Math.random() * (12 - 9),
    //     height: 9 + Math.random() * (12 - 9),
    //     opacity: 0.1 + Math.random() * (1 - 0.1),
    //     stagger: { each: 0.05, from: "random" }
    //   });
  }, []);

  useEffect(() => {
    animateStars();
  }, [animateStars])

  const genRandomColour = () => {
    const options = '0123456789ABCDEF';
    var colour = "#";
    for (var i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 15);
      colour += options[randomNumber];
    }
    return colour;
  };

  return (
    <section className={styles.Root}>
      {_.times(80, () => {
        let size = 2 + Math.random() * (8 - 2);
        let starStyles = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          height: `${size}px`,
          width: `${size}px`,
          background: genRandomColour()
        };
        stars.push(<span className={styles.Star} style={starStyles} ref={i => starRefs.current.push(i)} />);
      })}
      <div className={styles.StarWrapper}>
        {stars.map((star) => star)}
      </div>
      <div className={styles.TitleWrapper}>
        <h1 ref={titleRef}>EXPLORATION</h1>
        <a href="/login">Login to continue</a>
      </div>
    </section>
  );
}

export default Home;