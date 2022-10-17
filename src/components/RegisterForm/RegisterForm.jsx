import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI Component Imports:
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

import './registerForm.css';
import registerPhoto from './registerPhoto.jpg'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

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
            <img src={registerPhoto} alt="boy with map"></img>
          </Box>
          <Box
          className='loginForm'
          sx={{
            '& > :not(style)': {
              
              width: '25vw',
              height: '70vh',
            },
            
          }}
          noValidate
          autoComplete="off"
          >
          <form className="loginForm" >
              <InputLabel htmlFor="component-simple">Username</InputLabel>
              <Input 
                type="text"
                id="component-simple" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                />
              <InputLabel htmlFor="component-simple">Password</InputLabel>
              <Input 
                type='password'
                id="component-simple" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
              <Link to='/createProfile'>
                <Button onClick={registerUser} variant="contained" type="submit">Register</Button>
              </Link>
              <p>Already Have An Account? 
                <Link to='/login'> Login Here</Link>
              </p>
          </form>
          </Box>
        </div>
      </Paper> 
    </Box>
  );
}

export default RegisterForm;
