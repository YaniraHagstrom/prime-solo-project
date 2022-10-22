import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProviderItem from "./ProviderItem";

export default function Results(){
    const dispatch = useDispatch();
    
    const providerResults = useSelector(store=> store.results);

    const childServices = useSelector(store=> store.childReducer)

    const matches = [];
    
    // check to see if any of the services match:
    for (let provider of providerResults){
        if ((provider[1] === true && childServices[1] === true) || (provider[2] === true && childServices[2] === true) || (provider[3] === true && childServices[3] === true) || (provider[4] === true && childServices[4] === true) || (provider[5] === true && childServices[5] === true) || (provider[6] === true && childServices[6] === true) || (provider[7] === true && childServices[7] === true) || (provider[8] === true && childServices[8] === true) || (provider[9] === true && childServices[9] === true) || (provider[10] === true && childServices[10] === true)){
            matches.push(provider);
        }
    }
    console.log(matches);
    return (
        <div>
            {matches.map(provider=> (
                <ProviderItem key={provider.id} provider={provider}/>
            ))}    
        </div>
    )
}