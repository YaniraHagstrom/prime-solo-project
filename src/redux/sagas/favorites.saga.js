import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* addFavorite(action){
    const childID = action.payload;
    try{ 
        const favorites = yield axios({
            method: 'GET',
            url: `/api/favorites/${childID}`,
        })
        yield put({
            type:'SET_FAVORITES',
            payload: favorites.data
        })
    }
    catch (error) {
        console.log('Error getting favorites:', error);
    }
}

function* favoritesSaga(){
    yield takeLatest('SAGA_ADD_FAVORITE', addFavorite);
}

export default favoritesSaga;