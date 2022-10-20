import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../UserPage/userPage.css';
import './childForm.css';

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
    // console.log('services:',services); // [{id: 1, name: 'Speech Therapy'},..]
    // console.log('languages:',languages)
    
    const [childData, setChildData] = useState({name:'', age:'', primaryLanguage_id:'', secondaryLanguage_id:''});
    
    const [servicesChecked, setServicesChecked] = useState({1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false});
        


    const handleSubmit = (e)=> {
        e.preventDefault();
        const servicesObject = {services: servicesChecked}
        //services:{1: true, 2: false, 3: false,...}
        console.log(servicesChecked);

        const allChildData = {...childData, ...servicesObject};
        console.log(allChildData);
        // dispatch to add data to appropriate tables:
        dispatch({
            type: 'SAGA_ADD_CHILD',
            payload: allChildData
        })
        // add child data to reducer to use for filtering through provider results. 
        dispatch({
            type: 'SET_CHILD',
            payload: servicesChecked
        })
    }

    return(
        <>  
            <Box 
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': {
                    m: 10,
                    width: '80vw',
                    height: '80vh',
                },
                }}
                >
                <Paper elevation={3} >
                    <form >
                        <div className='dropDowns'>
                        {/* Child Name input */}
                            <div>
                                <TextField
                                    variant="standard"
                                    className='inputField'
                                    id="standard-basic"
                                    label="Name"
                                    value={childData.name}
                                    onChange={e => setChildData({...childData, name: e.target.value})}/>
                            </div>
                            {/* Age */}
                            <div className='ageInput'>
                                <TextField
                                    className='inputField'
                                    type='number'
                                    id="filled-basic"
                                    variant="standard"
                                    label="Age"
                                    value={childData.age}
                                    onChange={e => setChildData({...childData, age: e.target.value})}
                                />
                            </div>

                            {/* Primary Language Dropdown */}
                            <div>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel>Primary Language</InputLabel>
                                <Select
                                id="demo-simple-select-filled"
                                value={childData.primaryLanguage_id}
                                label='test'
                                onChange={e => setChildData({...childData, primaryLanguage_id: e.target.value})}
                                >
                                    {languages.map( language => (
                                        <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </div>

                            {/* Secondary Language Dropdown */}
                            <div>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-filled-label">Secondary Language</InputLabel>
                                <Select
                                id="demo-simple-select-filled"
                                value={childData.secondaryLanguage_id}
                                label='test'
                                onChange={e => setChildData({...childData, secondaryLanguage_id: e.target.value})}
                                >
                                    {languages.map( language => (
                                        <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </div>
                        </div>

                        {/* Service Checkboxes */}
                        <div className='checkBoxes'>
                        {services.map(service=> (
                            <FormControlLabel
                                key={service.id}
                                control={
                                <Checkbox
                                color="success"
                                // services = [{id: 1, name: 'Speech Therapy'},..]

                                // servicesChecked = {service: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false}
                                    checked={servicesChecked[service.id]}
                                    key={service.id}
                                    value={servicesChecked[service.id]}
                                    onChange={()=> {
                                        // console.log(e.target.value)
                                        // console.log(servicesChecked.taco[service.id]); //false
                                        const serviceId = service.id;
                                        if (!servicesChecked[serviceId]){
                                            
                                            setServicesChecked({...servicesChecked, [serviceId]: true})
                                        }
                                        else{
                                            setServicesChecked({...servicesChecked, [serviceId]: false});
                                        }
                                    }}
                                    />} 
                            label={service.name} 
                            />
                        ))}
                        </div>
                        <Link to='/results'>
                            <Button color="success" onClick={handleSubmit} variant="contained" >Add Child and Find Providers</Button>
                        </Link>
                        <Link to='/user'>
                            <Button color="success" variant="contained" >Cancel</Button>
                        </Link>
                    </form>
                </Paper>
            </Box>
        </>
    );
}

