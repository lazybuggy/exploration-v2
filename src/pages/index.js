import React, { useRef, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import styles from './index.module.scss';

import Nav from '../components/Nav/Nav';

import { withRedux } from '../redux/withRedux';
import { setLandingLoaded, setUserState } from '../redux/modules/app';

import Scenario from '../components/Exploration/Scenario';
import Home from '../components/Exploration/Home';

function Landing(props) {
  const containerRef = useRef();
  const dispatch = useDispatch();

  const animateInInit = useCallback(() => {
    gsap.set(containerRef.current, { autoAlpha: 0 });
  }, []);

  const animateIn = useCallback(async () => {
    await gsap.to(containerRef.current, { duration: 0.5, autoAlpha: 1, delay: 0.3 });
    dispatch(setLandingLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    animateInInit();
  }, [animateInInit]);

  useEffect(() => {
    animateIn();
  }, [animateIn]);

  const [user, setUser] = useState(props.user);
  const [scenarioId, setScenarioId] = useState("5d9209b71c9d44000034dd5e");

  const settingUser = useCallback(() => {
    if (user === null) {
      //find user in cache - save the user state
      const user_token = JSON.parse(localStorage.getItem('user_token'));
      user_token && setUser(dispatch(setUserState(user_token)).user);
    }
  }, [user, dispatch]);

  useEffect(() => {
    console.log("USE EFFECT CALLED ---------- USE EFFECT CALLED");
    settingUser();
  }, [settingUser]);

  useEffect(() => {
    if (user) {
      setScenarioId(user.savedPoint);
    }
  }, [user]);

  return (
    <section className={styles.Landing}>
      <Head>
        <title>Home | Jam3 generator</title>
      </Head>
      <Nav user={user} setUser={setUser} scenarioId={scenarioId} />
      <section className={styles.hero} ref={containerRef}>
        {user ?
          <Scenario scenarioId={scenarioId} setScenarioId={setScenarioId} />
          : <Home />
        }
      </section>
    </section>
  );
}

Landing.getInitialProps = ({ query }) => {
  var user = null;
  if (query && query.user) {
    user = JSON.parse(query.user);
  }
  return { user };
}

export default withRedux(Landing);
