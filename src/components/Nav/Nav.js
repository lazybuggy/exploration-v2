import React, { useCallback } from 'react';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Link from 'next/link';
import Router from 'next/router'
import { useDispatch } from 'react-redux';
import { setUserState } from '../../redux/modules/app';

import styles from './Nav.module.scss';

import SvgThreeLogo from '../../assets/svgs/svg-three-logo.svg';

import jam3LogoSrc from '../../assets/images/threeLogo.jpeg';
import githubLogoSrc from '../../assets/images/github-icon-64b.png';

const LINKS = [
  { href: 'https://jam3.com', label: 'Jam3', src: jam3LogoSrc },
  { href: 'https://github.com/jam3', label: 'GitHub', src: githubLogoSrc }
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}));

//
// async function saveProgress() {
//   await fetch("http://localhost:3000/api/users/" + props.user.username, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       savedPoint: scenarioId,
//     })
//   }).then(async (res) => {
//     alert("Progress Successfully saved")
//   });
// };

// // const dispatch = useDispatch();
// function signOut() {
//   // setScenarioId("5d88d9091c9d4400003c6bce");
//   useDispatch(setUserState({}));
//   localStorage.removeItem('user_token');
//   Router.push({
//     pathname: '/',
//   });
// };
//

function Nav(props) {
  // console.log("THIS IS THE NAV SPEAKING CHOOCHOO", props.user);
  // if (props.user) {
  //   console.log("CHUGCHUG CHOOCHOO", props.user.firstName);
  // }
  const dispatch = useDispatch();

  async function saveProgress() {
    await fetch("http://localhost:3000/api/users/" + props.user.username, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        savedPoint: props.scenarioId,
      })
    }).then(async (res) => {
      alert("Progress Successfully saved")
    });
  };

  const { setUser } = props;
  // function signOut() {
  const signOut = useCallback(() => {
    // setScenarioId("5d88d9091c9d4400003c6bce");
    dispatch(setUserState({}));
    localStorage.removeItem('user_token');
    console.log('removing and going back to home');
    setUser(null);
    Router.push({
      pathname: '/',
    }, '/');

  }, [setUser, dispatch]);

  return (
    <nav className={classnames(styles.Nav)}>
      <div className={styles.wrapper}>
        <ul className={styles.links}>
          <li>
            {props.user
              ? <div className="navContent">
                <h2>Signed in as {props.user.firstName}</h2>
                <Link href="/"><a onClick={signOut}>Sign Out</a></Link>
                <button onClick={saveProgress}>Save Progress</button>
              </div>
              : <div className="navContent">
                <Link href="/login"><a>Log In</a></Link>
                <Link href="/signup"><a>Sign Up</a></Link>
              </div>
            }
          </li>
        </ul>

        {/* <div className="nav">
          {props.user
            ? <div className="navContent">
              <h2>Signed in as {props.user.firstName}</h2>
              <Link href="/"><a onClick={signOut}>Sign Out</a></Link>
              <button onClick={saveProgress}>Save Progress</button>
            </div>
            : <div className="navContent">
              <Link href="/login"><a>Log In</a></Link>
              <Link href="/signup"><a>Sign Up</a></Link>
            </div>
          }
        </div> */}

        {/* <ul className={styles.links}>
          {LINKS.map(({ key, href, label, src }) => (
            <li key={key}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <img src={src} alt={label} />
              </a>
            </li>
          ))}
        </ul> */}
      </div>
    </nav>
  );
}

Nav.propTypes = checkProps({});

Nav.defaultProps = {};

export default Nav;
