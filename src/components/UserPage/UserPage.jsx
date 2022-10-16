import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import icon from './iconImages/dragonfly.jpg'
import './userPage.css';
import ChildForm from '../ChildForm/ChildForm';

// MUI Imports:
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <header>
        <Link to='/home'>Logout</Link>
      </header>
      <div className='container'>
        <div className="userBox">
          <Avatar 
            alt="Dragonfly" 
            src={icon}
            sx={{ width: 150, height: 150 }} />
          <h2>Welcome, {user.username}!</h2>
          {/* <p>Your ID is: {user.id}</p> */}
        </div>
        <div className='otherBox'>
          {/* Need to render button to add a child */}
          <ChildForm />
        <Button variant="contained">Add Child</Button>
        </div>
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
