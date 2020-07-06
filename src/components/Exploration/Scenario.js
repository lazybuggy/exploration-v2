import fetch from 'isomorphic-unfetch';
import React, { useState, useEffect } from 'react';
import styles from './Scenario.module.scss';
import Choices from './Choices';
import Typer from './Typer';

const Scenario = (props) => {
  const [scenario, setScenario] = useState({});
  const [background, setBackground] = useState('https://cdn.wallpapersafari.com/24/38/js0uT2.jpg');


  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/scenarios/" + props.scenarioId);
      res.json().then(res => {
        setScenario(res);
        if (res.background) {
          setBackground(res.background)
        }
      });
    }
    fetchData();
  }, [props.scenarioId]);

  // var text="omg whar is happ";

  // function typeWrite(hello){
  //   // var i = 0;
  //   for(var i=0;i < hello.length;i++){
  //     document.getElementById("yo").innerHTML += hello.charAt(i);
  //     // console.log(i,hello.length,hello.charAt(3));
  //     // i++;
  //     console.log('inc',i);
  //     // setTimeout(typeWrite(hello),1);
  //   }
  // }
  let bgStyles = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  };

  // var poo = "";
  // const [texty, setTexty] = useState(poo);
  // var i = 0;
  // var count = 0;
  // function testAnim(para) {
  //   // para.
  //   const subst = para.substring(1);
  //   // for (var i = 0; i < para.length; i++) {
  //   poo = poo + para.substring(0, 1);
  //   setTexty(poo);
  //   count++;
  //   if (count < i) {
  //     console.log(texty);
  //     // setTimeout(testAnim(subst), 100 + count * 50);
  //   }
  //   // return <h2>{para}+{".. hi"}</h2>
  // }
  // console.log("test scenario")
  // const Typero = ({ speed = 100, children }) => {
  //   const [idx, setidx] = React.useState(0);
  //   console.log("wtff");
  //   React.useEffect(() => {
  //     const timer = window.setInterval(() => setidx(v => v + 1), speed);
  //     return () => window.clearInterval(timer);
  //   })

  //   return <div>{children.substr(0, idx)}</div>;
  // };

  return <div className={styles.Scenario}>
    <div className={styles.background_wrapper}>
      <div className={styles.background} style={bgStyles} />
      <div className={styles.scenarioText}>
        {/* <div id="yo" /> */}
        {/* {scenario.text && scenario.text.split('//').map((paragraph, index) => {
          return <h1 key={index}>{paragraph}</h1>
        })
        } */}
        {scenario.text && scenario.text.split('//').map((paragraph, index) => {
          // i = paragraph.length;
          console.log("loool", paragraph);
          return <div key={index}><Typer speed={100}>{paragraph}</Typer></div>;
        })
        }
      </div>
    </div>
    {/* <div className="background" style={{ background: scenario.background ? `url(${scenario.background})`:null}}/> */}

    {/* <Choices scenarioId={props.scenarioId} setScenarioId={props.setScenarioId} /> */}
    <div className={styles.choices_wrapper}>

      <Choices scenarioId={props.scenarioId} setScenarioId={props.setScenarioId} />
    </div>
  </div>
};

export default Scenario;
