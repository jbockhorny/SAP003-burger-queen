import React from 'react';
import {StyleSheet, css} from 'aphrodite'

const LinkMenu = ({children, ...props}) => {
    return (
        <a className={css(style.link)} {...props}>{props.title} R$ {children},00 </a>
    )
}

const style = StyleSheet.create({
    link: {
        border: '1px solid black', 
        padding: '10px',
        marginBottom: '10px',    
    }
})

export default LinkMenu;