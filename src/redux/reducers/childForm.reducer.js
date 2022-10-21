
const childDataReducer = (state = {}, action)=> {
    switch (action.type){
        case 'SET_CHILD':
            return action.payload;
        case 'UPDATE_CHILD_DATA':
            return {...state, childID: action.payload}
        default:
            return state;
    }
}

export default childDataReducer;