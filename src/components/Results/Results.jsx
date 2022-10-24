import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ProviderItem from "./ProviderItem";
import './providerItem.css';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Fab } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
// import avatar1 from './avatar1.jpg'

export default function Results(){
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(store=> store.user);
    useEffect(()=>{
        dispatch({
            type:'SAGA_GET_CITIES',
            payload: user.country_id
            })
    })
    
    const providerResults = useSelector(store=> store.results);

    const childServices = useSelector(store=> store.childReducer)

    const child = useSelector(store=> store.childReducer);

    const matches = [];
    
    // check to see if any of the services match:
    for (let provider of providerResults){
        if ((provider[1] === true && childServices[1] === true) || (provider[2] === true && childServices[2] === true) || (provider[3] === true && childServices[3] === true) || (provider[4] === true && childServices[4] === true) || (provider[5] === true && childServices[5] === true) || (provider[6] === true && childServices[6] === true) || (provider[7] === true && childServices[7] === true) || (provider[8] === true && childServices[8] === true) || (provider[9] === true && childServices[9] === true) || (provider[10] === true && childServices[10] === true)){
            matches.push(provider);
        }
    }

    // console.log(matches);
    const avatars = (1,2,3,4,5,6)

    return (
        <div className="page">
            <div className='childProfile'>
                <Avatar className='childAvatar'
                    src={require('./childAvatar.jpg')}
                    sx={{ border: 2 ,width: 125, height: 125 }}
                    ></Avatar>
                <Typography sx={{textAlign: 'center', mt: 2, mb: 1, fontWeight:'bold'}} component="div" variant="h4">
                {child.name}
                </Typography>
                <Fab className='searchButton'  size="small" variant='extended'color="secondary" aria-label="add"  onClick={()=>{history.push(`/favorites/${child.id}`)}}> 
                    <FavoriteIcon/>
                    Favorites
                </Fab>
            </div>
            <div className="results">
                <Typography sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }} component="div" variant="h5">
                Matching Providers
                </Typography>
                {matches.map(provider=> (
                    <ProviderItem key={provider.id} provider={provider}/>
                ))}    
            </div>
        </div>
    )
}