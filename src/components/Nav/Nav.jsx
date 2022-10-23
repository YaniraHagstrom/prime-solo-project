import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import icon from './logo.png';
import avatar from './dragonfly.jpg'

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className='logo'>
        <Link to="/home">
          <img className='userIcon' src={icon}/>
        </Link>
        <div className='logo2'>
          <p className="nav-title">ECDS Abroad</p>
        </div>
      </div>
      <div className='blank'></div>
      <div className='avatar'>
      <Avatar 
              alt="Dragonfly" 
              src={avatar}
              sx={{ width: 40, height: 40}} 
      />
      </div>
    </div>
  );
}

export default Nav;


// {/* <div className="nav">
//       <Link to="/home">
//         <h2 className="nav-title">ECDS Abroad</h2>
//       </Link>
//       <div>
//         {/* If no user is logged in, show these links */}
//         {!user.id && (
//           // If there's no user, show login/registration links
//           <Link className="navLink" to="/login">
//             Login / Register
//           </Link>
//         )}

//         {/* If a user is logged in, show these links */}
//         {user.id && (
//           <div className='avatar'>
//             <Link className="navLink" to="/user">
//               Home
//             </Link>

//             {/* <Link className="navLink" to="/info">
//               Info Page
//             </Link> */}

//             <LogOutButton className="navLink" />
//             <Avatar 
//               alt="Dragonfly" 
//               src={icon}
//               sx={{ width: 75, height: 75}} />
//           </div>
//         )}

//         {/* <Link className="navLink" to="/about">
//           About
//         </Link> */}
//       </div>
//     </div> */}