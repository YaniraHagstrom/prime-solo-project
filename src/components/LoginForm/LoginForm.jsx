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
import './loginForm.css';

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
        }})

    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
          <div className='actualForm'>
            <form className="loginForm" onSubmit={login}>
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
                  variant="extended" type="submit">Login</Fab>
            </form>
          </div>
  );
}

export default LoginForm;
