import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './userPage.css';

// MUI Component Imports:
import { InputLabel, FormControl, Select, MenuItem, FormHelperText } from "@mui/material";



export default function ChildForm(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({
            type: 'SAGA_FETCH_LANGUAGES'
        })
    },[])
    const languages = useSelector(store=> store.languages)
    const [childData, setChildData] = useState({age:'', primaryLanguage:'', secondaryLanguage:'', services:''});


    console.log(languages);
    return(
        <>
            {/* Age Dropdown */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
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
            </FormControl>

            {/* Primary Language Dropdown */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Primary Language</InputLabel>
                <Select
                value={childData.primaryLanguage}
                label='test'
                onChange={e => setChildData({...childData, primaryLanguage: e.target.value})}
                >
                    <MenuItem value='0-5'>0-5</MenuItem>
                </Select>
            </FormControl>

            {/* Secondary Language Dropdown */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Secondary Language</InputLabel>
                <Select
                value={childData.secondaryLanguage}
                label='test'
                onChange={e => setChildData({...childData, age: secondaryLanguage.target.value})}
                >
                    <MenuItem value='0-5'>0-5</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}