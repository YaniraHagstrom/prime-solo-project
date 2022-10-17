import { combineReducers } from 'redux';

const countryReducer =(state=[], action)=> {
    switch (action.type){
        case 'SET_COUNTRIES':
            return action.payload;
        default:
            return state;
    }
}


export default countryReducer;