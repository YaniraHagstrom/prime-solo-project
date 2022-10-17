import { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import icon from './iconImages/dragonfly.jpg'
import './userPage.css';
import ChildForm from '../ChildForm/ChildForm';

// MUI Imports:
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { InputLabel, FormControl, Select, MenuItem,FormControlLabel } from "@mui/material";

function UserPage() {
  const dispatch=useDispatch();
  // Need GET request to get countries and Cities for country and city dropdown.
  useEffect(()=> {
    dispatch({
      type: 'SAGA_GET_COUNTRIES'
    })
    
  },[]) 

  const user = useSelector((store) => store.user);
  const countries = useSelector(store => store.countries);
  const cities = useSelector(store=> store.cities);
  // console.log(countries);

  const [locationData, setLocationData] = useState({country_id:'', city_id:''});
  // const [countryId, setCountryId] = useState(0);
  // console.log(countryId);
  // filtering cities by the country selected to populate dropdown.
  // const [countryCities, setCountryCities] = useState({});

  const handleCountry =(e)=> {
    setLocationData({...locationData, country_id: e.target.value});
    // console.log(countryId);
    dispatch({
      type:'SAGA_GET_CITIES',
      payload: e.target.value
    })
  }

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
          {/* <ChildForm /> */}
          {/* When 'Add Child' button is clicked, send to ChildForm component */}
        <Link to='/addChild'>
        <Button variant="contained">Add Child</Button>
        </Link>
        </div>
      </div>
      <div>

      {/* Countries Dropdown */}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Country</InputLabel>
          <Select
          value={countries.id}
          label='test'
          onChange={handleCountry}
          >
            {countries.map( country => (
              <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
            ))} 
          </Select>
          </FormControl>

        {/* Cities Dropdown */}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>City</InputLabel>
          <Select 
          // value={childData.primaryLanguage_id}
          // label='test'
          // onChange={e => setChildData({...childData, primaryLanguage_id: e.target.value})}
          >
              {cities.map(city => (
                  <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
