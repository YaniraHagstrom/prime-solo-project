import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI Component Imports:
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

import './loginForm.css';
import loginPhoto from './loginPhoto.jpg';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Box 
      sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > :not(style)': {
        m: 10,
        width: '70vw',
        height: '70vh',
      },
    }}
    >
      <Paper elevation={3} >
        <div className='loginBox'>
          <Box
            className='loginPhoto'
            sx={{
              '& > :not(style)': { 
                width: '45vw',
                height: '70vh',
              },
          }}
          >
            <img src={loginPhoto} alt="boy with map"></img>
          </Box>
          <Box
          className='loginForm'
          sx={{
            '& > :not(style)': {
              
              width: '25  vw',
              height: '70vh',
            },
            
          }}
          noValidate
          autoComplete="off"
          >
          <form className="loginForm" onSubmit={login}>
              <InputLabel htmlFor="component-simple">Username</InputLabel>
              <Input 
                value={username}
                onChange={e => setUsername(e.target.value)} 
              />
              <InputLabel htmlFor="component-simple">Password</InputLabel>
              <Input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
              <Button variant="contained" type="submit">Login</Button>
              <p>Don't Have An Account? 
                <Link to='/registration'> Register Here</Link>
              </p>
          </form>
          </Box>
        </div>
      </Paper> 
    </Box>
  );
}

export default LoginForm;
