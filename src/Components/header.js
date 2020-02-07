import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const Header = ({ ...props }) => {
  return (
    <header {...props}>
      <img className={css(style.logo)} src={'./img/logo.png'} alt="Hamburgueria Burger Queen" />
    </header>
  )
}

const style = StyleSheet.create({
  logo: {
    width: '30%',
    height: 'auto',
    marginTop: '8%',
    marginBottom: '2%',
  },
})
export default Header;