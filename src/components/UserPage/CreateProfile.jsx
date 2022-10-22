import { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import icon from './iconImages/dragonfly.jpg'
import './createProfile.css';

// MUI Imports:
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { InputLabel, FormControl, Select, MenuItem,FormControlLabel } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
        <div>
            <div className='profileContainer'>
                <div className='avatar'>
                    <Avatar 
                        alt="Dragonfly" 
                        src={icon}
                        sx={{ width: 150, height: 150}} 
                    />
                    <h2>Welcome, {user.username}!</h2>
                </div>
                <p>Lets set up your profile</p>
                <p>Choose your destination</p>
            
                <form onSubmit={handleSubmit}>
                    {/* Countries Dropdown */}
                    <div className='selects'>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginRight:'20px' }}>
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
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                    <div className='submit'>
                        <Button variant="outlined" type="submit" >Submit</Button>
                    </div>
                </form>
            </div>
        </div>
            /* <Autocomplete
                value={country}
                id="country-select-demo"
                onChange={e}
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
                )}
            /> */
    )
}