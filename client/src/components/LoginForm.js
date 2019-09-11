import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../config/firebase';

const LoginForm = (props) => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('');

  const validateEntry = () => {
    if (!input.email || !input.password) {
      setError('Missing required fields');
      return false;
    } else {
      return true;
    }
  }

  const changeHandler = event => {
    setError('');
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }

  const submitHandler = event => {
    event.preventDefault();
    if (validateEntry()) {
      firebase.auth().signInWithEmailAndPassword(input.email, input.password)
          .then(response => {
            
            setInput({
              email: '',
              password: ''
            })
            props.history.push('/dashboard');
          })
          .catch(error => {
            setError(error.message);
          })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input name='email' value={input.email} placeholder='Username' onChange={changeHandler} />
      <input type='password' name='password' value={input.password} placeholder='Password' onChange={changeHandler} />
      {error && <div>{error}</div>}
      <button>Submit</button>
    </form>
  )
}

export default withRouter(LoginForm);