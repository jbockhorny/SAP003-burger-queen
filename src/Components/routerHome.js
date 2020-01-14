import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";

import Header from '../Components/header';

const RouterHome = () => {
  return (
    <>
      <Header className={css(style.header, style.logo)} />
      <nav className={css(style.linkButton)}>

        <Link className={css(style.buttonHome)} to="/hall">Salão</Link>
        <Link className={css(style.buttonHome)} to="/kitchen">Cozinha</Link>
      </nav>
    </>
  );
}

const style = StyleSheet.create({
  buttonHome: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    height: '25%',
    alignItems: 'center',
    margin: '1%',
    padding: '5%',
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

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

})

export default RouterHome;