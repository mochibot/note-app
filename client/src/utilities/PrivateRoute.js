import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import firebase from '../config/firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(response => {
      if (response) {
        setAuthUser(response);
      } else {
        setAuthUser(null);
      }
    }) 
  }, [])

  return (
    <Route 
      {...rest}
      render={props => 
        !authUser ?  <Redirect to='/' /> : <Component {...props} />} />
  )
}

export default PrivateRoute;