import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import icon from './logo.png';
import avatar from './dragonfly2.jpg'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Nav() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const cities = useSelector(store=> store.cities);

  return (
    <>
    { user.id &&
    
    <div className="nav">
      <div className='logo'>
        <Link to="/home">
          <img className='userIcon' src={icon}/>
        </Link>
        <div className='logo2'>
        <Typography sx={{ color: 'white', textAlign: 'center', ml: 1}} component="div" variant="h5">
            ECDS Abroad 
        </Typography>
        </div>
      </div>
      <div className='avatar'>
      {user.id && (
        <>
          <Button variant="text" onClick={()=> history.push('/about')}>About</Button>
            <LogOutButton className="navLink" />
            {/* <Avatar 
              alt="Dragonfly" 
              src={icon}
              sx={{ width: 75, height: 75}} /> */}
          { cities ?
          <Avatar 
            alt="Dragonfly" 
            src={avatar}
            sx={{ width: 40, height: 40, mr: 2}} 
          />
          : null
        }
        </>
        )}

      </div>
    </div>
  }
  </>
  );
}

export default Nav;

