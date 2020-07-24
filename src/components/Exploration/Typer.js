import React, { useState, useEffect } from 'react';

const Typer = (props) => {
  const [index, setIndex] = useState(0);
  const [forward, goForward] = useState(true);

  useEffect(() => {
    setIndex(0);
    goForward(true);
  }, [props.text]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (props.text.length > index && forward) {
        setIndex(i => i + 1);
      } else if (index >= 0) {
        setIndex(i => i - 1);
        goForward(false);
      } else {
        window.clearInterval(timer);
        goForward(true);
      }
    }, props.speed);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, props])
  return <div>{props.text.substring(0, index)}</div>;
};

export default Typer;
