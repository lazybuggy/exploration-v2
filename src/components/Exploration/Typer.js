import React, { useState, useEffect } from 'react';

const Typer = (props) => {
  const [index, setIndex] = useState(0);
  // const bo = false;
  // console.log("hi");

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (props.children.length > index) {
        setIndex(i => i + 1);
      } else {
        window.clearInterval(timer);
      }
    }, props.speed);
    return () => window.clearInterval(timer);
  }, [index, props])
  return <div>{props.children.substring(0, index)}</div>;
  // console.log("heelloo");
  // return <div>{props.children}</div>;
};

// const Typero = ({ speed = 100, children }) => {
//   const [idx, setidx] = React.useState(0);
//   React.useEffect(() => {
//     const timer = window.setInterval(() => setidx(v => v + 1), speed);
//     return () => window.clearInterval(timer);
//   })

//   return <div>{children.substr(0, idx)}</div>;
// };

export default Typer;
