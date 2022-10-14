import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI Component Imports:
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

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
    <Box className='loginBox'
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
        <div >
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
            <form className="loginForm" onSubmit={registerUser}>
                <InputLabel htmlFor="component-simple">Username</InputLabel>
                <Input 
                  id="component-simple" 
                  value={username} 
                  onChange={e => setUsername(e.target)} 
                  />
                <InputLabel htmlFor="component-simple">Password</InputLabel>
                <Input 
                  id="component-simple" 
                  value={password} 
                  onChange={e => setPassword(e.target)} 
                />
                <Button variant="contained">Login</Button>
            </form>
          </Box>
        </div>
      </Paper> 
    </Box>
  );
}

export default RegisterForm;
