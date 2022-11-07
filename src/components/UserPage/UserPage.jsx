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
import Typography from '@mui/material/Typography';


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
        { !user.city_id ? // new user? then select country and city.
          <CreateProfile/>
          :
          <div className="page">
            <div className='userProfile'>
                <Avatar 
                    src={require('./iconImages/dragonfly2.jpg')}
                    className='userAvatar2'
                    sx={{ border:2, width: 125, height: 125 }}>
                </Avatar>
                <Typography sx={{textAlign: 'center', mt: 2, mb: 1, fontWeight:'bold'}} component="div" variant="h5">
                {user.username}
                </Typography>
                <Typography sx={{textAlign: 'center'}} component="div" variant="h6">
                Lisbon, Portugal
                </Typography>
            </div>
            <div>
              { children.length < 1 ?
                <div className='noChildren'>
                    {/* <img className='childHead' src={childImage}/> */}
                    <Typography sx={{textAlign: 'center'}} component="div" variant="h6">
                    Create a child profile to search for providers
                    </Typography> 
                    <Link className='addButton' to='/childform'>
                      <Fab color="primary" aria-label="add">
                        <AddIcon />
                      </Fab>
                    </Link>
                </div>
                : 
                <div className='children'>
                    {children.map(child => (
                      <ChildCard key={child.id} child={child}/>
                    ))}
                  <div className='addChild'>
                  <p> Add Another Child</p>
                  <Link className='addButton' to='/childform'>
                    <Fab color="primary" aria-label="add">
                      <AddIcon />
                    </Fab>
                  </Link>
                  </div>
            </div>
            }
            </div>
        </div>
}
      </div>
  );
}

{/* // this allows us to use <App /> in index.js */}
export default UserPage;
