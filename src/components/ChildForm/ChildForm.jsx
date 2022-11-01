import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './childForm.css';

// MUI Component Imports:
import { InputLabel, FormControl, Select, MenuItem, Checkbox, FormGroup, FormControlLabel, Box, Paper, TextField, Button, Fab, Avatar, Badge} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';



export default function ChildForm(){
    const dispatch = useDispatch();
    const history = useHistory();

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
    console.log('services:',services); // [{id: 1, name: 'Speech Therapy'},..]
    // console.log('languages:',languages)
    
    const [newChild, setNewChild] = useState({name:'', age:'', primaryLanguage_id:'', secondaryLanguage_id:'', 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false });
    // console.log(newChild)
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        // dispatch to add data to appropriate tables:
        dispatch({
            type: 'SAGA_ADD_CHILD',
            payload: newChild
        })
        // add child data to reducer to use for filtering through provider results. 
        dispatch({
            type: 'SET_CHILD',
            payload: newChild
        })
        history.push('/results');
    }

    const SmallIcon = styled(EditIcon)(({ theme }) => ({
        width: 22,
        height: 22,
        // border: `2px solid ${theme.palette.background.paper}`,
    }));

    return(
        <div className='childForm'>  
            <form onSubmit={handleSubmit}>
                <div className='child'>
                    <Badge 
                        sx={{mr: 10}} 
                        overlap="circular"
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        badgeContent={<Fab size="small"><SmallIcon /></Fab>}
                    >
                        <Avatar 
                        alt="Dragonfly" 
                        sx={{ border: 2, width: 130, height: 130}} 
                        src={require('./childAvatar.jpg')}
                        />
                    </Badge>
                    {/* Child Name input */}
                    <TextField
                        sx={{ mr: 5 }}
                        variant="standard"
                        className='inputField'
                        id="standard-basic"
                        label="Name"
                        value={newChild.name}
                        onChange={e => setNewChild({...newChild, name: e.target.value})}
                    />
                    {/* Age */}
                    <TextField
                        className='inputField'
                        type='number'
                        id="filled-basic"
                        variant="standard"
                        label="Age"
                        value={newChild.age}
                        onChange={e => setNewChild({...newChild, age: e.target.value})}
                    />
                </div>

                    {/* Primary Language Dropdown */}
                    <div className='dropDowns'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 200, mr: 5 }}>
                            <InputLabel>Primary Language</InputLabel>
                            <Select
                            id="demo-simple-select-filled"
                            value={newChild.primaryLanguage_id}
                            label='test'
                            onChange={e => setNewChild({...newChild, primaryLanguage_id: e.target.value})}
                            >
                                {languages.map( language => (
                                    <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    {/* Secondary Language Dropdown */}
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-filled-label">Secondary Language</InputLabel>
                        <Select
                        id="demo-simple-select-filled"
                        value={newChild.secondaryLanguage_id}
                        label='test'
                        onChange={e => setNewChild({...newChild, secondaryLanguage_id: e.target.value})}
                        >
                            {languages.map( language => (
                                <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Service Checkboxes */}
                <div className='checkBoxes'>
                {services.map(service=> (
                    <FormControlLabel
                        key={service.id}
                        control={
                        <Checkbox
                        size="small" 
                        color="success"
                        // const [newChild, setNewChild] = useState({name:'', age:'', primaryLanguage_id:'', secondaryLanguage_id:'', 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false });
                            checked={newChild[service.id]}
                            key={service.id}
                            value={newChild[service.id]}
                            onChange={()=> {
                                // console.log(e.target.value)
                                // console.log(servicesChecked.taco[service.id]); //false
                                const serviceId = service.id;
                                if (!newChild[serviceId]){
                                    
                                    setNewChild({...newChild, [serviceId]: true})
                                }
                                else{
                                    setNewChild({...newChild, [serviceId]: false});
                                }
                            }}
                            />} 
                    label={service.name} 
                    />
                ))}
                </div>
                <div className='buttons'>
                    <Fab className='searchButton' variant="extended" size="medium" color="primary" aria-label="add"  type='submit' sx={{ mr: 2 }} >
                        <SearchIcon sx={{ mr: 1 }} />
                        Search
                    </Fab>
                    <Fab className='searchButton' variant="extended" size="medium" color="primary" aria-label="add"  onClick={()=> history.push('/user')}>
                        <CancelIcon sx={{ mr: 1 }}/>
                        Cancel
                    </Fab>
                </div>
                
            </form>
        </div>
    );
}

