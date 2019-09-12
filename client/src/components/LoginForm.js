import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../config/firebase';
import { Form, Icon, Input, Button } from 'antd';

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
      firebase.auth()
        .signInWithEmailAndPassword(input.email, input.password)
        .then(response => {
          setInput({
            email: '',
            password: ''
          })
        })
        .then(() => {
          return firebase.auth().onAuthStateChanged(response => {
              if (response) {
                props.history.push('/dashboard');
              } 
            }) 
        })
        .catch(error => {
          setError(error.message);
        })
    }
  }

  return (
    <Form onSubmit={submitHandler}>
      <Input
        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
        name='email' 
        value={input.email} 
        placeholder='Username' 
        onChange={changeHandler} />
      <Input 
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type='password' 
        name='password' 
        value={input.password} 
        placeholder='Password' 
        onChange={changeHandler} />
      {error && <div>{error}</div>}
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  )
}

export default withRouter(LoginForm);