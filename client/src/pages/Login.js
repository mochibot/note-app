import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div>
      <div>Nevernote (an Evernote clone)</div>
      <LoginForm />
      <div>Don't have an account? <Link to='/register'>Register</Link></div>
    </div>
  )
}

export default Login;