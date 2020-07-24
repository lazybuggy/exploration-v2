import React, { useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import gsap from 'gsap';
import styles from './signup.module.scss';
import { withRedux } from '../../redux/withRedux';
import Nav from '../../components/Nav/Nav';
import { useSignUpForm } from '../../components/Exploration/CustomHooks';

const Signup = (props) => {
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

  const signup = (message) => {
    if (message.firstName == undefined) {
      alert(message);
    } else {
      Router.push('/login');
    }
  }

  const { inputs, handleSubmit, handleInputChange } = useSignUpForm(signup);
  return <section className={styles.Landing}>
    <Head>
      <title>Home | Jam3 generator</title>
    </Head>

    <Nav user={null} />

    <div className={styles.Signup} ref={backgroundRef}>
      <div className={styles.TextWrapper}>
        <h1 className={styles.Header}>Are your ready for an adventure?</h1>
        <h3 className={styles.Header}>Get ready to choose your journey and reach your destination.</h3>
      </div>
      <div className={styles.FormWrapper}>
        <form onSubmit={handleSubmit} className={styles.Form} ref={formRef}>
          <label>First Name</label>
          <input className={styles.Input} type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} required />

          <label>Last Name</label>
          <input className={styles.Input} type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} required />

          <label>Username</label>
          <input className={styles.Input} type="text" name="username" onChange={handleInputChange} value={inputs.username} required />

          <label>Password</label>
          <input className={styles.Input} type="password" name="password1" onChange={handleInputChange} value={inputs.password1} required />

          <label>Confirm Password</label>
          <input className={styles.Input} type="password" name="password2" onChange={handleInputChange} value={inputs.password2} required />

          <input className={styles.Button} type="submit" value="SIGN UP" />
        </form>
      </div>
    </div>
  </section>
};

export default withRedux(Signup);