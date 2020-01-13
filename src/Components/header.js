import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const Header = ({...props}) => {
  return (
    <header {...props}>
      <img className={css(style.logo)} src={require("../../src/img/logo.png")} alt="Hamburgueria Burger Queen" />
    </header>
  )
}

const style = StyleSheet.create({
  logo: {
    width: '40%',
    height: 'auto',  
    margin: '1%',

  },



})
export default Header;