import fetch from 'isomorphic-unfetch';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './Scenario.module.scss';
import Choices from './Choices';
import Typer from './Typer';

const Scenario = (props) => {
  const [scenario, setScenario] = useState({});
  const [background, setBackground] = useState('https://cdn.wallpapersafari.com/24/38/js0uT2.jpg');
  const [audio, setAudio] = useState(null);

  const playAudio = useCallback(() => {
    const promise = audio.play();
    if (promise) {
      promise.then(_ => {

      }).catch(err => {
        console.log("err", err);
      })
    }
  }, [audio]);

  const pauseAudio = () => {
    audio.pause();
  }

  useEffect(() => {
    setAudio(new Audio('/assets/sounds/Unknown_Planet.mp3'));
    // if (audio) {
    //   audio.load();
    // }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/scenarios/" + props.scenarioId);
      res.json().then(res => {
        console.log("GETTING NEW SCENARIO");
        setScenario(res);
        if (res.background) {
          setBackground(res.background)
        }
      });
    }
    fetchData();
  }, [props.scenarioId]);

  let bgStyles = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  };

  return <div className={styles.Scenario}>
    <div className={styles.background_wrapper}>
      <div className={styles.background} style={bgStyles} />
      <div className={styles.scenarioText}>
        {scenario.text && <div><Typer speed={100} text={scenario.text.replace("//", " ")} /></div>}
      </div>
      <button onClick={playAudio}>PLAY</button>
      <button onClick={pauseAudio}>PAUSE</button>
    </div>
    <div className={styles.choices_wrapper}>
      <Choices scenarioId={props.scenarioId} setScenarioId={props.setScenarioId} />
    </div>
  </div>
};

export default Scenario;
