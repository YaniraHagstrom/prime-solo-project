import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ServiceOptions() {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch({
            type: 'SAGA_FETCH_SERVICES'
        })
    },[])
    const services = useSelector(store=> store.services);
    // console.log(services.length);
    
    // 1. 👇 creates an array of the service id's from services.
    const serviceId = services.map(service => { 
        return service.id;
    })
    
    // 2. 👇 creates an object of service id's with a default value of false.
    const checkedArray ={}
    for (let id of serviceId){
        checkedArray[id] = false;
    }

    console.log(checkedArray);
    // console.log(serviceId);

    //2. When the box is checked/unchecked, need to change the value for the service id to true/false:
    const handleChange = (id) => {
        if (!checkedArray[id]){
            checkedArray[id] = true;
        }
        else{
            checkedArray[id] = false;
        }
        console.log(checkedArray);
    }

    return(
        
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
    );
}