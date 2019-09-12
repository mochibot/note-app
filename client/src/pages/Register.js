import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div>
      <RegisterForm />
      <div>Have an account? <Link to='/'>Log in</Link></div>
    </div>
  )
}

export default Register;