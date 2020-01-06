import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import { Link } from "react-router-dom";

import Header from '../Components/header';

const RouterHome = () => {
  return (
    <>
    <Header className={css(style.header)} />
    <nav className={css(style.linkButton)}>

      <Link className={css(style.buttonHome)} to="/hall">Hall</Link>
      <Link className={css(style.buttonHome)} to="/kitchen">Kitchen</Link>
    </nav> 
    </>   
  );
}

const style = StyleSheet.create({
  buttonHome: {
    display:'flex',
    flexDirection: 'column',
    width: '50%',
    height: '50%',
    alignItems: 'center',
    margin: '1%',
    padding: '5%',
    fontFamily: 'sans-serif',
    fontSize: '200%',
    background: '#8C251C',
    color: '#F2F2F2',

  },

  linkButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1%',    

  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10%'
  }

})

export default RouterHome;