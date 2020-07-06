import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import styles from './login.module.scss';
import Nav from '../../components/Nav/Nav';
import { useLogin } from '../../components/Exploration/CustomHooks';


import { withRedux } from '../../redux/withRedux';

const Login = (props) => {

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
      <title>Home | Jam3 generator</title>
    </Head>

    <Nav user={null} />
    <div className={styles.Wrapper}>
      <h2 className="header">Exploration</h2>
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input className="text" type="text" name="username" onChange={handleInputChange} value={inputs.username} required />

          <label>Password</label>
          <input className="text" type="password" name="password" onChange={handleInputChange} value={inputs.password} required />

          <input className="button" type="submit" value="Login" />
          {/* <Link href="/signup"><a className="button">Sign Up</a></Link> */}
        </form>

      </div>
    </div>
  </section>
};

export default withRedux(Login);