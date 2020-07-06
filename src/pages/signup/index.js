import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import styles from './signup.module.scss';
import { withRedux } from '../../redux/withRedux';
import Nav from '../../components/Nav/Nav';
import { useSignUpForm } from '../../components/Exploration/CustomHooks';

const Signup = (props) => {

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

    <div className={styles.Signup}>
      <div className={styles.TextWrapper}>
        <h1 className={styles.Header}>Are your ready for your adventure?</h1>
        <h2>Welcome to Exploration. Get ready to choose your journey and reach your destination</h2>
      </div>
      <div className={styles.FormWrapper}>
        <form onSubmit={handleSubmit} className={styles.Form}>
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

          <input className="button" type="submit" value="Sign up!" />
          {/* <Link href="/login"><a className="button">Login</a></Link> */}
        </form>
      </div>
    </div>
  </section>
};

export default withRedux(Signup);