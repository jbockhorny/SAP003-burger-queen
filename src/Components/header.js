import React from 'react';
import {css, StyleSheet} from 'aphrodite';

const Header = () => {
  return (
    <header className={css(style.header)}>
            <img className={css(style.logo)} src={require("./logo.png")} alt="Burger Queen" /> <p>burgerQueen</p>
    </header>
    )
}

const style = StyleSheet.create({
  logo: {
    width: '130px',
    height: 'auto',
    margin: '10px'
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    fontSize: '30px',
    color: 'red'   
    
  }

})
export default Header;