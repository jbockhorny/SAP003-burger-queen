import React from 'react';

const LinkMenu = ({ children, ...props }) => {
  return (
    <a {...props}>{props.title} R$ {children},00 </a>
  )
}

export default LinkMenu;