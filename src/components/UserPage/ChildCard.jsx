import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './userPage.css';

// MUI Imports:
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { Fab } from "@mui/material";


export default function ChildCard({child}){
    const dispatch = useDispatch();
    const history = useHistory();
    
    // SET childReducer to current child:
    const handleEditClick = ()=> {
        dispatch({
            type: 'SET_CHILD',
            payload: child
        })
        history.push(`/childForm/${child.id}`)
    }
    return(
        <div>
            <Card className='childCard' sx={{ maxWidth: 345 }}>
                <div className='childAvatar'>
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        ></Avatar>
                </div>
                
                    <Typography sx={{ mt: 2 }}className='childName' gutterBottom variant="h5" component="div">
                    {child.name}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    </Typography> */}
                    <div className='cardButtons'>
                        <Fab className='searchButton' variant="extended" size="medium" color="primary" aria-label="add"  onClick={handleEditClick} sx={{ mr: 2 }} >
                            <SearchIcon sx={{  }} />
                            Providers
                        </Fab>
                        <Fab className='searchButton'  size="small" color="secondary" aria-label="add"  onClick={()=>{history.push(`/favorites/${child.id}`)}}>
                            <FavoriteIcon/>
                        </Fab>
                        {/* <Button color="success" variant="contained" onClick={handleEditClick}>Edit</Button> */}
                        {/* <Button color="success" variant="contained" onClick={()=>{history.push(`/favorites/${child.id}`)}}>Favorites</Button> */}
                    </div>
            </Card>
        </div>
    )
} 