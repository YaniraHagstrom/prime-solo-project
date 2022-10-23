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
          <div className='formLayout'>
            <form className="loginForm" onSubmit={registerUser}>
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
                <Fab variant="extended" type="submit">Register</Fab>
                {/* <p>Already An Account? 
                  <Button to='/registration'> Register Here</Button>
                </p> */}
            </form>
          </div>
  );
}

export default RegisterForm;
