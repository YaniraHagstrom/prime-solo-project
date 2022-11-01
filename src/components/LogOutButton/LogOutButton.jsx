import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

function LogOutButton() {
  const dispatch = useDispatch();

  const logOut = ()=>{
    dispatch({ type: 'LOGOUT' })
    history.push('/home')
  }
  return (
    <Button
    variant="text" 
      onClick={logOut}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
