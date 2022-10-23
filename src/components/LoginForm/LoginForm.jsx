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
          <div className='formLayout'>
            <form className="loginForm" onSubmit={login}>
                <InputLabel htmlFor="component-simple">Username</InputLabel>
                <TextField
                  type='text'
                  value={username}
                  onChange={e => setUsername(e.target.value)} 
                />
                <InputLabel sx={{ mt: 2 }} htmlFor="component-simple">Password</InputLabel>
                <TextField
                  sx={{ mb: 3 }}
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)} 
                />
                <Fab variant="extended" type="submit">Login</Fab>
                {/* <p>Don't Have An Account? 
                  <Button to='/registration'> Register Here</Button>
                </p> */}
            </form>
          </div>
  );
}

export default LoginForm;
