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

  const settingUser = useCallback(() => {
    if (user === null) {
      const user_token = JSON.parse(localStorage.getItem('user_token'));
      // console.log('nroam', dispatch(setUserState(user_token)).user);
      console.log('found saved in cache - saving state');
      setUser(dispatch(setUserState(user_token)).user);
    } else {
      // console.log("PROPS USER IS STIL FOUND", user, props.user);
    }
  }, [user, dispatch]);

  useEffect(() => {
    console.log("USE EFFECT CALLED ---------- USE EFFECT CALLED");
    settingUser();
  }, [settingUser]);
  // const [token, setToken] = useToken('token');

  // useEffect(() => {
  //   useToken();
  // }, [useToken]);

  // const meep = token;
  // console.log('merpmerpmeprmeprmerp', meep);
  // if (token) {
  //   console.log('teehehee token found', token);
  //   user = token;
  // }

  //
  var lastSavedScenario = "5d88d9091c9d4400003c6bce"; // null;
  if (user) {
    console.log("found user", user);
    console.log('props user', props.user);
    lastSavedScenario = user.savedPoint;
  } else {
    console.log("user wtf lol", user);
  }
  const [scenarioId, setScenarioId] = useState(lastSavedScenario);
  // const [user, setUser] = useState(connect());

  return (
    <section className={styles.Landing}>
      <Head>
        <title>Home | Jam3 generator</title>
      </Head>

      <Nav user={user} setUser={setUser} scenarioId={scenarioId} />

      <section className={styles.hero} ref={containerRef}>
        {/* <div className="content">
          <div className="inner"> */}
        {user ?
          <Scenario scenarioId={scenarioId} setScenarioId={setScenarioId} />
          : <Home />
        }
        {/* </div>
        </div> */}
        {/* 
        <h1 className={styles.title}>Welcome to Jam3!</h1>

        <p className={styles.description}>
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>

        <ul className={styles.row}>
          <li>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h3>Code standard</h3>
              <p>Learn more about Jam3 code standard.</p>
            </a>
          </li>
          <li>
            <a href="https://nextjs.org/learn" className={styles.card}>
              <h3>Jam3.dev</h3>
              <p>Learn more about Jam3.dev</p>
            </a>
          </li>
        </ul> */}
      </section>
    </section>
  );
}

// Landing.ComponentDidMount(){
//   console.log('this is the clent side');
//   this.props.query.user;
// };

Landing.getInitialProps = ({ query }) => {
  var user;
  console.log('hello from landing index');
  if (query && query.user) {
    user = JSON.parse(query.user);
  } else {
    // if (localStorage) {
    //   console.log('local storage found');
    //   user = localStorage.getItem('user_token');
    //   console.log('localst', user);
    // } else {
    user = null;
    // }
  }
  return { user };
}

// Landing.ComponentDidMount(){
//   console.log('hmmm');
// }

export default withRedux(Landing);
