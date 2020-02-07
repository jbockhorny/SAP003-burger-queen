import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";

import Header from '../Components/header';

const Home = () => {
  return (
    <div className={css(style.home)}>
      <Header className={css(style.header, style.logo)} />
      <nav className={css(style.linkButton)}>

        <Link className={css(style.buttonHome, style.activeButtonHome)} to="/hall">Salão</Link>
        {/* <Link className={css(style.buttonHome, style.activeButtonHome)} to="/kitchen">Cozinha</Link> */}
      </nav>
    </div>
  );
}

const style = StyleSheet.create({

  home: {
    background: 'black',
    width: '100vw',
    height: '200vw',    
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '5%',
  },

  buttonHome: {
    display: 'flex',
    flexDirection: 'column',
    width: '15%',
    height: '100%',
    alignItems: 'center',
    margin: '1%',
    padding: '3%',
    fontFamily: 'sans-serif',
    fontSize: '200%',
    background: '#8C251C',
    color: '#F2F2F2',
    textDecorationLine: 'none',
    border: '1px solid black',
    borderRadius: '5px',

  },

  linkButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'none',
  },

  activeButtonHome: {
    ':active': {
      color: '#8C251C',
      background: '#F2F2F2',
    },
  },
})

export default Home;