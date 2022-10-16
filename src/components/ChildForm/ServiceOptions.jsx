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
    // 1. create an array equal to the length of the number of checkboxes and use the array 'fill' method. 

    const [checkedState, setCheckedState]= useState();


    // 2. Create an array of objects that will allow us to update whether the checkbox was checked or not:
    // 👇 creates an array of the service id's from services.
    const serviceId = services.map(service => { 
        return service.id;
    })
    
    // 👇 creates an object of service id's with a default value of false.
    const checkedArray ={}
    for (let id of serviceId){
        checkedArray[id] = false;
    }

    console.log(checkedArray);
    console.log(serviceId);
    
    // const handleChange = (position) => {
    //     const updatedCheckedState = checkedState.map((item, index) =>
    //         index === position ? !item : item
    //     );

    //     setCheckedState(updatedCheckedState);

    return(
        
        <div>
            {services.map(service=> (
                <FormControlLabel
                    key={service.id}
                    control={
                    <Checkbox
                        key={service.id}
                        value={service.id}
                        onChange={() => handleChange()}
                    />} label={service.name} 
                />
            ))}
        </div>
    );
}