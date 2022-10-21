import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router';

import ProviderItem from "../ProviderItem";

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

    return (
        <div>
            <h2></h2>
            {favorites.map(provider=> (
                <ProviderItem key={provider.id} provider={provider} favored={true} childID={params.id}/>
            ))}    
        </div>
    )
}   