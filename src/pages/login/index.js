import React, { useEffect, useCallback, useRef } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import gsap from 'gsap';
import styles from './login.module.scss';
import Nav from '../../components/Nav/Nav';
import { useLogin } from '../../components/Exploration/CustomHooks';
import { withRedux } from '../../redux/withRedux';

const Login = (props) => {
  const backgroundRef = useRef();
  const formRef = useRef();

  const animateBackground = useCallback(() => {
    gsap.to(backgroundRef.current, { duration: 0.5, opacity: 1, delay: 1 });
  }, [])

  const animateForm = useCallback(() => {
    gsap.from(formRef.current.children, {
      duration: 1,
      y: 100,
      opacity: 0,
      delay: 1.5,
      stagger: { each: 0.5 }
    });
  }, [])

  useEffect(() => {
    animateBackground();
  }, [animateBackground]);

  useEffect(() => {
    animateForm();
  }, [animateForm]);

  const login = (message) => {
    if (message.firstName == undefined) {
      alert(message);
    } else {
      localStorage.setItem('user_token', JSON.stringify(message));
      Router.push({
        pathname: '/',
        query: { user: JSON.stringify(message) },
      }, '/');
    }
  }

  const { inputs, handleLogin, handleInputChange } = useLogin(login);
  return <section className={styles.Landing}>
    <Head>
      <title>Exploration | Login</title>
    </Head>

    <Nav user={null} />
    <div className={styles.Wrapper} ref={backgroundRef}>
      <h1 className={styles.Header}>Exploration</h1>
      <div className={styles.FormWrapper}>
        <form className={styles.Form} onSubmit={handleLogin} ref={formRef}>
          <label>Username</label>
          <input className={styles.Input} type="text" name="username" onChange={handleInputChange} value={inputs.username} required />

          <label>Password</label>
          <input className={styles.Input} type="password" name="password" onChange={handleInputChange} value={inputs.password} required />

          <input className={styles.Button} type="submit" value="Login" />
          {/* <Link href="/signup"><a className="button">Sign Up</a></Link> */}
        </form>

      </div>
    </div>
  </section>
};

export default withRedux(Login);