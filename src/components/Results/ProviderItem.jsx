import './providerItem.css';
import { useState } from 'react';

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


export default function ProviderItem({provider}){
    
    const [favorite, setFavorite] = useState(false);
    const childData = useSelector(store=> store.childData);

    const addFavorite = ()=>{
        dispatch({
            type: 'SAGA_ADD_FAVORITE',
            payload: childData.childID
        })
        setFavorite(true);
    }

    return(
        <div className='resultsList'>
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
                </Box>
            </Card>
        </div>
    )
} 