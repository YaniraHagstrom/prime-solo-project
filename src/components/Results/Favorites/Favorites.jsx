import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router';
import '../providerItem.css';

import ProviderItem from "../ProviderItem";
import Avatar from '@mui/material/Avatar';

export default function Favorites(){
    const favorite = true;
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(()=>{
        dispatch({
            type: 'SAGA_FETCH_FAVORITES',
            payload: params.id
        })
    },[])

    const favorites = useSelector(store=> store.favorites);
    const child = useSelector(store=> store.childReducer);

    return (
        <>
            <div className="childProfile">
            <div className='childAvatar'>
                <Avatar
                    sx={{ width: 100, height: 100 }}
                    >{child.name}</Avatar>
            </div>
            </div>
            <div className="favorites">
                <h2>Favorites</h2>
                {favorites.map(provider=> (
                    <ProviderItem key={provider.id} provider={provider} favored={true} childID={params.id}/>
                ))}    
            </div>
        </>
    )
}   