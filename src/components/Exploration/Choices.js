import fetch from 'isomorphic-unfetch';
import React, { useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Choices.module.scss';

const Choices = (props) => {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/choices/" + props.scenarioId);
      res.json().then(res => setChoices(res));
    }
    fetchData();
  }, [props.scenarioId]);

  return <div className={styles.Choices}>
    <ReactCSSTransitionGroup
      transitionName={styles}
      className={styles.choiceTransition}
      transitionLeaveTimeout={500}
      transitionEnterTimeout={500}>
      {choices.map((choice, key) => {
        return (
          <button
            key={choice._id}
            className={styles.choice}
            onClick={() => props.setScenarioId(choice.nextScenarioId)}>
            {choice.text}
          </button>
        );
      })
      }
    </ReactCSSTransitionGroup>

  </div>
};

export default Choices;
