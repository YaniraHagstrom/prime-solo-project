import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './userPage.css';

// MUI Imports:
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


export default function ChildCard({child}){
    // const children = useSelector(store=> store.children);
    // console.log(child);
    return(
        <Card className='childCard' sx={{ maxWidth: 345 }}>
            <div className='childAvatar'>
                <Avatar
                    sx={{ width: 100, height: 100 }}
                    >{child.name}</Avatar>
            </div>
            <CardContent>
                <Typography className='childName' gutterBottom variant="h5" component="div">
                {child.name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography> */}
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}