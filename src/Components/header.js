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
    width: '50%',
    height: 'auto',
    margin: '2%',    
  },



})
export default Header;