import React from 'react';
import Navigation from './Navigation';

function Layout(props) {
    const {children} = props;
  return (
    <>
     <Navigation/>
     {children}
    </>
  )
}

export default Layout