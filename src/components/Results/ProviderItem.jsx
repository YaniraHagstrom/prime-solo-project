import './providerItem.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI Imports:
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


export default function ProviderItem({provider, favored}){
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(false);
    const childData = useSelector(store=> store.childDataReducer);

    const addFavorite = ()=>{
        dispatch({
            type: 'SAGA_ADD_FAVORITE',
            payload: {childID: childData.childID, providerID: provider.id}
            })
        setFavorite(true);
    }

    const deleteFavorite=()=> {
        console.log(childData.childID);
        dispatch({
            type: 'SAGA_DELETE_FAVORITE',
            payload: {provider_id: provider.id, child_id: childData.childID}
        })
    }

    return(
        
        <div className='resultsList'>
            {provider &&
            <Card sx={{ display: 'flex', marginTop: '10px', width: '80vw' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Avatar
                        sx={{ width: 100, height: 100, marginLeft: '15px' }}
                        >{provider.name}</Avatar>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        {provider.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                    </CardContent>
                    { favored ? 
                        <Box 
                            sx={{ display: 'flex',alignItems: 'center', pl: 1, pb: 1 }}>
                                <Fab size="small" color="primary" >
                                    <HighlightOffIcon
                                        onClick={deleteFavorite}
                                    />
                                </Fab> 
                        </Box>
                    :
                        <Box 
                            sx={{ display: 'flex',alignItems: 'center', pl: 1, pb: 1 }}>
                            {!favorite ? 
                                <Fab size="small" color="secondary" >
                                    <FavoriteIcon 
                                        onClick={addFavorite}
                                    />
                                </Fab> :
                                <Fab size="small" disabled aria-label="like" >
                                    <FavoriteIcon 
                                        onClick={addFavorite}
                                    />
                                </Fab>
                            }
                        </Box>
                    }
                </Box>
            </Card>}
        </div>
    )
} 