import { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import icon from './iconImages/dragonfly.jpg'
import './userPage.css';

// MUI Imports:
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { InputLabel, FormControl, Select, MenuItem,FormControlLabel } from "@mui/material";

export default function CreateProfile(){

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

    console.log('location data:',locationData );


    const handleCountry =(e)=> {
        setLocationData({...locationData, country_id: e.target.value});
        // console.log(countryId);
        dispatch({
        type:'SAGA_GET_CITIES',
        payload: e.target.value
        })
    }


    const handleSubmit=()=> {
        dispatch({
            type: 'SAGA_ADD_LOCATION',
            payload: locationData
            })
    }

    return(
        <>
            <div className='container'>
                <div className="userBox">
                <Avatar 
                    alt="Dragonfly" 
                    src={icon}
                    sx={{ width: 150, height: 150 }} />
                <h2>Welcome, {user.username}!</h2>
                <p>Lets set up your profile</p>
                </div>
                <div className='otherBox'>
                </div>
            </div>
            <div>
                {/* Countries Dropdown */}
                <FormControl sx={{ m: 1, minWidth: 120 }} onSubmit={handleSubmit}>
                    <InputLabel>Country</InputLabel>
                    <Select
                    value={locationData.country_id}
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
                    value={locationData.city_id}
                    label='test'
                    onChange={e => setLocationData({...locationData, city_id: e.target.value})}
                    >
                        {cities.map(city => (
                            <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Link to='/user'>
                    <Button variant="contained" type="submit" >Submit</Button>
                </Link>
            </div>
        </>
    )
}