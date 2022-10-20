import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Results(){
    const dispatch = useDispatch();
    
    const providerResults = useSelector(store=> store.results);

    return (
        <>
            {providerResults.map(provider=> (
                <p>provider.name</p>
            ))}    
            
        </>
    )
}