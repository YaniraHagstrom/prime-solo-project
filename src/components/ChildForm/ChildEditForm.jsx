import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import '../UserPage/userPage.css';
import './childForm.css';

// MUI Component Imports:
import { InputLabel, FormControl, Select, MenuItem, Checkbox, FormGroup, FormControlLabel, Box, Paper, TextField, Button } from "@mui/material";


export default function ChildEditForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(()=>{
        dispatch({
            type: 'SAGA_FETCH_LANGUAGES'
        })
        dispatch({
            type: 'SAGA_FETCH_SERVICES'
        })
        dispatch({
            type: 'SAGA_FETCH_CHILD',
            payload: params.id
        })
    },[params.id])

    const languages = useSelector(store=> store.languages);
    const services = useSelector(store=> store.services);
    const child = useSelector(store=> store.childReducer);
    console.log('child object:',child);

    const child_id = Number(params.id);

    const handleSubmit = (e)=> {
        e.preventDefault();
        // dispatch to update the child data:
        dispatch({
            type: 'SAGA_UPDATE_CHILD',
            payload: child
        })
        history.push(`/results/${child_id}`);
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
                    <form onSubmit={handleSubmit}>
                        <div className='dropDowns'>
                        {/* Child Name input */}
                            <div>
                                <TextField
                                    variant="standard"
                                    className='inputField'
                                    id="standard-basic"
                                    label="Name"
                                    value={child.name}
                                    onChange={(e)=> dispatch({type:'SET_NAME', payload: e.target.value})}/>
                            </div>
                            {/* Age */}
                            <div className='ageInput'>
                                <TextField
                                    className='inputField'
                                    type='number'
                                    id="filled-basic"
                                    variant="standard"
                                    label="Age"
                                    value={child.age}
                                    onChange={(e)=> dispatch({type:'SET_AGE', payload: e.target.value})}
                                />
                            </div>

                            {/* Primary Language Dropdown */}
                            <div>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel>Primary Language</InputLabel>
                                <Select
                                // defaultValue={primaryLanguage.name}
                                id="demo-simple-select-filled"
                                value={child.primarylanguage_id}
                                label='test'
                                onChange={(e)=> dispatch({type:'SET_LANGUAGE1', payload: e.target.value})}
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
                                value={child.secondarylanguage_id}
                                label='test'
                                onChange={(e)=> dispatch({type:'SET_LANGUAGE2', payload: e.target.value})}
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
                                    checked={child[service.id]}
                                    key={service.id}
                                    value={child[service.id]}
                                    onChange={()=> {
                                        dispatch({type:`SET_CHECKED${service.id}`, payload: !child[service.id]})
                                    }}
                                    />} 
                            label={service.name} 
                            />
                        ))}
                        </div>
                        <Button color="success"  variant="contained" type="submit">Update and Search</Button>
                        <Link to='/user'>
                            <Button color="success" variant="contained" >Cancel</Button>
                        </Link>
                    </form>
                </Paper>
            </Box>
        </>
    );
}

