import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import firebase from './config/firebase';
import PrivateRoute from './utilities/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {

  return (
    <div className="App">
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
    </div>
);
}

export default withRouter(App);
