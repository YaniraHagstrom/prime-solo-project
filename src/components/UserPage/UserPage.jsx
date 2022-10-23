import { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import childImage from './iconImages/neurodiverseHead.jpg'
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
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function UserPage() {
  const dispatch=useDispatch();
  useEffect(()=> {
    dispatch({
    type: 'SAGA_GET_COUNTRIES'
    })
    dispatch({
      type: 'SAGA_FETCH_CHILDREN'
    })
    
},[]) 
  const children = useSelector(store=> store.children);
  const user = useSelector((store) => store.user);
  const countries = useSelector(store => store.countries);
  const cities = useSelector(store=> store.cities);

  return (

      <div>
        { !user.city_id ? 
          <CreateProfile/>
          :
          <div >
              { !children ?
                <div className='noChildren'>
                    <img className='childHead' src={childImage}/>
                    <p> Add a child to search for providers</p>
                    <Link className='addButton' to='/childform'>
                      <Fab color="primary" aria-label="add">
                        <AddIcon />
                      </Fab>
                    </Link>
                </div>
                : 
                <div className='childCards'>
                    {children.map(child => (
                      <ChildCard className='childCard' key={child.id} child={child}/>
                    ))}
                </div>
            }
        </div>
}
      </div>
  );
}

{/* // this allows us to use <App /> in index.js */}
export default UserPage;
