import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI Component Imports:
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { TextField, Fab } from "@mui/material";
import '../LoginForm/loginForm.css';
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
          <div className='actualForm'>
            <form className="loginForm" onSubmit={registerUser}>
                <TextField
                  sx={{width: 300, backgroundColor: 'white', borderRadius: 2 }}
                  label='Username'
                  type='text'
                  value={username}
                  onChange={e => setUsername(e.target.value)} 
                />
                <TextField
                  label='Password'
                  sx={{ mt: 3, mb: 2, width: 300, backgroundColor: 'white', borderRadius: 2 }}
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)} 
                />
                <Fab 
                  sx={{width: 250 }}
                  variant="extended" type="submit">Register</Fab>
              </form>
          </div>
  );
}

export default RegisterForm;
