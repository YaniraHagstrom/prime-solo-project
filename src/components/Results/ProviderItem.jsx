import './providerItem.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI Imports:
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';


export default function ProviderItem({provider, favored, childID}){
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(false);
    const favorites = useSelector(store=> store.favorites);

    const addFavorite = ()=>{
        // console.log(provider.child_id)
        dispatch({
            type: 'SAGA_ADD_FAVORITE',
            payload: {childID: provider.child_id, providerID: provider.id}
            })
        setFavorite(true);
    }
    
    const languages = useSelector(store=> store.languages);
    const countries = useSelector(store=> store.countries);
    const cities = useSelector(store => store.cities);
    const child = useSelector(store=> store.childReducer);
    const services = useSelector(store=> store.services);
    
    const deleteFavorite=()=> {
        // console.log(provider.id);
        // console.log(provider.child_id)

        dispatch({
            type: 'SAGA_DELETE_FAVORITE',
            payload: {provider_id: provider.provider_id, child_id:provider.child_id }
        })
    }
    const country = countries[provider.country_id -1].name;
    const city = cities[provider.city_id - 1].name
    const languagesObj = {};

    for (let language of languages){
        languagesObj[language.id]=language.name;
    }

    const servicesObj = {};
    
    for (let service of services){
        servicesObj[service.id] = service.name;
    }
    console.log(servicesObj)
    // filter out names of services that match:
    const matches = [];    
    // check to see if any of the services match:
    const serviceArray = [1,2,3,4,5,6,7,8,9,10];
    for (let serviceID of serviceArray){
        if (provider[serviceID] && child[serviceID]){
            matches.push(servicesObj[serviceID])
        }
    }
    console.log(matches);

    return(
        
        <div >
            {provider &&
            <Card className='providerCard'>
                    <div className='providerAvatar'>
                    <Avatar
                        variant="circle"
                        sx={{ width: 100, height: 100, marginTop: '16px', ml: '4px' }}
                        >{provider.name}</Avatar>
                    </div>
                    <div className='providerText'>
                        <Typography component="div" variant="h6"
                            sx={{ mt: '12px' }}>
                            {provider.name}
                        </Typography>
                        <div className='location'>
                            <LocationOnIcon sx={{ mr: 1 }}/>
                            <Typography>{city}, {country}</Typography>
                        </div>
                        <div className='email'>
                            <EmailIcon sx={{ mr: 1 }}/>
                            <Typography> emailme@email.com</Typography>
                        </div>
                        <div className='languages'>
                            <Typography>Languages:</Typography>
                            <Typography sx={{ ml: 1 }}>{languagesObj[provider.language_id1]}<span className='dot'>&#x2022;</span>{languagesObj[provider.language_id2]}</Typography>
                        </div>
                        <div className='services'>
                            <Typography >Services:</Typography>
                            {matches.map(service => (
                                <>
                                <span className='dot'> &#x2022;</span>
                                <Typography>{service}</Typography>
                                </>
                            ) )}
                        </div>
                    </div>
                    <div className='icons'>
                    { favored ? 
                        <div className='icon'
                            sx={{ display: 'flex',alignItems: 'center', pl: 1, pb: 1 }}>
                                <Fab size="small" color="primary" >
                                    <HighlightOffIcon
                                        onClick={deleteFavorite}
                                    />
                                </Fab> 
                        </div>
                    :
                        <div className='icon'
                            sx={{ display: 'flex',alignItems: 'center', pl: 1, pb: 1 }}>
                            {!favorite ? 
                                <Fab size="small" color="secondary" >
                                    <FavoriteIcon 
                                        onClick={addFavorite}
                                    />
                                </Fab> :
                                <Fab  size="small" disabled aria-label="like" >
                                    <FavoriteIcon 
                                        onClick={addFavorite}
                                    />
                                </Fab>
                            }
                        </div>
                    }
                    </div>
            </Card>}
        </div>
    )
} 