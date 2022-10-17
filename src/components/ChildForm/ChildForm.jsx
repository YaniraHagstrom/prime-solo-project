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
    // console.log(services); // [{id: 1, name: 'Speech Therapy'},..]

    
    const [childData, setChildData] = useState({name:'', age:'', primaryLanguage_id:'', secondaryLanguage_id:''});
    
    const [servicesChecked, setServicesChecked] = useState({1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false});
        
    console.log('Service Checked:',servicesChecked)

    const handleSubmit = ()=> {
        const servicesObject = {services: servicesChecked}
        //services:{1: true, 2: false, 3: false,...}

        const allChildData = {...childData, ...servicesObject};
        console.log(allChildData);
            dispatch({
                type: 'SAGA_ADD_CHILD',
                payload: allChildData
            })
    }

    console.log(servicesChecked);
    return(
        <>
            <form >
                {/* Child Name input */}
                <TextField
                    id="outlined-required"
                    label="Name"
                    value={childData.name}
                    onChange={e => setChildData({...childData, name: e.target.value})}
                />
                {/* Age */}
                <TextField
                    type='number'
                    id="outlined-required"
                    label="Age"
                    value={childData.age}
                    onChange={e => setChildData({...childData, age: e.target.value})}
                />

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
                        // services = [{id: 1, name: 'Speech Therapy'},..]

                        // servicesChecked ={1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false}
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
                <Button onClick={handleSubmit} variant="contained" >Add Child and Find Providers</Button>
                </Link>
            </form>
        </>
    );
}
