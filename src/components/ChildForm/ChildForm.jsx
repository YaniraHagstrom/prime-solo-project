import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServiceOptions from './ServiceOptions';


import '../UserPage/userPage.css';

// MUI Component Imports:
import { InputLabel, FormControl, Select, MenuItem, Checkbox, FormGroup, FormControlLabel, Box, Paper, TextField, Button } from "@mui/material";


export default function ChildForm(){
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch({
            type: 'SAGA_FETCH_LANGUAGES'
        })
        dispatch({
            type: 'SAGA_FETCH_SERVICES'
        })
    },[])

    const languages = useSelector(store=> store.languages);
    const services = useSelector(store=> store.services);
    
    const [childData, setChildData] = useState({age:'', primaryLanguage_id:'', secondaryLanguage_id:''});

    // when submit button is clicked, need to check which checkboxes are clicked and add them to an array to send to saga. 

    // ** CheckBox Functionality **
    const serviceId = services.map(service => { 
        return service.id;
    })
    
    // 2. 👇 creates an object of service id's with a default value of false.
    const checkedArray ={}
    for (let id of serviceId){
        checkedArray[id] = false;
    }
    // console.log(checkedArray);

    const handleChange = (id) => {
        if (!checkedArray[id]){
            checkedArray[id] = true;
        }
        else{
            checkedArray[id] = false;
        }
        // console.log(checkedArray);
    }

    // On Submit of this form:
        // 1. Add child to children table
        // 2. Add child_id and primary & secondary language to child_languages table
        // 3. Add services checked to child_services table. 
    const handleSubmit = ()=> {
        console.log('clicked')
    }

    return(
        <>
            <form >
                {/* Child Name input */}
                <TextField
                    id="outlined-required"
                    label="Name"
                />
                {/* Age */}
                <TextField
                    type='number'
                    id="outlined-required"
                    label="Age"
                    value={childData.age}
                    onChange={e => setChildData({...childData, age: e.target.value})}
                />
                {/* Age Range DropDown Menu */}
                {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Age</InputLabel>
                    <Select
                    value={childData.age}
                    label='test'
                    onChange={e => setChildData({...childData, age: e.target.value})}
                    >
                        <MenuItem value='0-5'>0-5</MenuItem>
                        <MenuItem value='6-10'>6-10</MenuItem>
                        <MenuItem value='11-17'>11-17</MenuItem>
                        <MenuItem value='18'>18+</MenuItem>
                    </Select>
                </FormControl> */}

                {/* Primary Language Dropdown */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Primary Language</InputLabel>
                    <Select
                    value={childData.primaryLanguage_id}
                    label='test'
                    onChange={e => setChildData({...childData, primaryLanguage_id: e.target.value})}
                    >
                        {languages.map( language => (
                            <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Secondary Language Dropdown */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Secondary Language</InputLabel>
                    <Select
                    value={childData.secondaryLanguage_id}
                    label='test'
                    onChange={e => setChildData({...childData, secondaryLanguage_id: e.target.value})}
                    >
                        {languages.map( language => (
                            <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Service Checkboxes */}
                <div>
                {services.map(service=> (
                    <FormControlLabel
                        key={service.id}
                        control={
                        <Checkbox
                            key={service.id}
                            value={service.id}
                            onChange={()=> handleChange(service.id)}
                        />} 
                    label={service.name} 
                    />
                ))}
                </div>
                <Button onClick={handleSubmit} variant="contained" >Add Child</Button>
            </form>
        </>
    );
}