import React from 'react';

const LinkMenu = ({ children, ...props }) => {
  return (
    <a {...props}>{props.title}{children}</a>
  )
}

export default LinkMenu;