import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../config/firebase';

const RegisterForm = (props) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const [error, setError] = useState('');

  const validateEntry = () => {
    if (!input.email || !input.password || !input.firstName || !input.lastName) {
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
      firebase.auth()
        .createUserWithEmailAndPassword(input.email, input.password)
        .then(response => {
          localStorage.setItem('authUser', response)
          return firebase.firestore().collection('users')
            .doc(response.user.uid)
            .set({
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email
            })
        })
        .then(() => {
          
          setInput({
            email: '',
            password: '',
            firstName: '',
            lastName: ''
          })
          props.history.push('/dashboard')
        })
        .catch(error => {
          setError(error.message)
        })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input name='email' value={input.email} placeholder='Email' onChange={changeHandler} />
      <input name='firstName' value={input.firstName} placeholder='First name' onChange={changeHandler} />
      <input name='lastName' value={input.lastName} placeholder='Last name' onChange={changeHandler} />
      <input type='password' name='password' value={input.password} placeholder='Password' onChange={changeHandler} />
      {error && <div>{error}</div>}
      <button>Submit</button>
    </form>
  )
}

export default withRouter(RegisterForm);