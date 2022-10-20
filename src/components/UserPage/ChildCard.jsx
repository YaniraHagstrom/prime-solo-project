import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ChildCard({child}){
    // const children = useSelector(store=> store.children);
    // console.log(child);
    return(
        <p>{child.name}</p>
    )
}