import { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import icon from './iconImages/dragonfly2.jpg'
import './createProfile.css';

// MUI Imports:
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { InputLabel, FormControl, Select, MenuItem,FormControlLabel, Fab } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';

export default function CreateProfile(){

    const dispatch=useDispatch();
    //  Need GET request to get countries and Cities for country and city dropdown.
    useEffect(()=> {
        dispatch({
        type: 'SAGA_GET_COUNTRIES'
        })
        
    },[]) 

    const user = useSelector((store) => store.user);
    const countries = useSelector(store => store.countries);
    const cities = useSelector(store=> store.cities);
    // console.log(countries);
    // testing autocomplete:
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const [locationData, setLocationData] = useState({country_id:'', city_id:''});

    // console.log('location data:',locationData );
    const [selectedCountry, setSelectedCountry]= useState('');
    const [selectedCity, setSelectedCity] =useState('')

    const handleCountry =(e)=> {
        e.preventDefault();
        setLocationData({...locationData, country_id: e.target.value});
        // console.log(countryId);
        dispatch({
        type:'SAGA_GET_CITIES',
        payload: e.target.value
        })
    }


    const handleSubmit=(e)=> {
        e.preventDefault();
        console.log('button clicked:', locationData)
        // update user data table with new location data:
        dispatch({
            type: 'SAGA_ADD_LOCATION',
            payload: locationData
            })
        // send location data to user reducer:
        dispatch({
            type: 'UPDATE_USER_LOCATION',
            payload: locationData
        })
    }

    return(
        <div className='createProfile'>
            <div className='profileContainer'>
                
                <Avatar 
                    className='userAvatar'
                    alt="Dragonfly" 
                    src={icon}
                    sx={{border: 2, width: 150, height: 150, mb: 2}} 
                />
                
                <Typography sx={{ textAlign: 'center', mb: 1}}         component="div" variant="h4">
                Welcome, {user.username}!
                </Typography>

                <Typography sx={{  textAlign: 'center' }} component="div" variant="h5">
                Select your destination
                </Typography>

                <form className='submitForm' onSubmit={handleSubmit}>
                    {/* Countries Dropdown */}
                    <div className='locationForm'>
                        <FormControl variant="standard" sx={{ minWidth: 150, mr: 2 }}>
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
                        <FormControl variant="standard" sx={{minWidth: 150, mr: 2, mb: 4}}>
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
                    </div>
                    <Fab 
                        sx={{width: 250, ml: 3, mt: 3}}
                        variant="extended" type="submit">Submit
                    </Fab>
                </form>
                
                
            </div>
        </div>
    )
}