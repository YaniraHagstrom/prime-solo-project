import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* addFavorite(action){
    const ids = action.payload;
    console.log('ids sent to saga:', ids);
    try{ 
        const favorites = yield axios({
            method: 'POST',
            url: '/api/favorites',
            data: ids
        })
    }
    catch (error) {
        console.log('Error posting favorites:', error);
    }
}

function* favoritesSaga(){
    yield takeLatest('SAGA_ADD_FAVORITE', addFavorite);
}

export default favoritesSaga;