import { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import icon from './iconImages/dragonfly.jpg'
import './userPage.css';
import ChildForm from '../ChildForm/ChildForm';
import CreateProfile from './CreateProfile';
import ChildCard from './ChildCard';

// MUI Imports:
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { InputLabel, FormControl, Select, MenuItem,FormControlLabel } from "@mui/material";

function UserPage() {
  const dispatch=useDispatch();
  useEffect(()=> {
    dispatch({
    type: 'SAGA_GET_COUNTRIES'
    })
    dispatch({
      type: 'SAGA_GET_CHILDREN'
    })
    
},[]) 
  const children = useSelector(store=> store.children);
  const user = useSelector((store) => store.user);
  const countries = useSelector(store => store.countries);
  const cities = useSelector(store=> store.cities);

  return (
    // need to conditional render CreateProfile if there is no country_id && city_id
    <>
      { !user.city_id ? 
      <CreateProfile/>
      :
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
            <h2>{user.username}</h2>
            {/* <p>Your ID is: {user.id}</p> */}
            {/* <h3>{cityName},</h3> */}

            {/* <h3>{countryName}</h3> */}
          </div>
          <div className='childBox'>
            <div className='childCards'>
                {children.map(child => (
                  <ChildCard className='childCard' key={child.id} child={child}/>
                ))}
            </div>
            {/* Will need to conditionally render list of children or if no children in list, then have add child button with message */}
            {/* <ChildList /> */}
            {/* When 'Add Child' button is clicked, send to ChildForm component */}
            <div>
            <Link to='/childform'>
              <Button variant="contained">Add Child</Button>
            </Link>
            </div>
          </div>
        </div>
      </>
      }
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
