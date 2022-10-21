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
        console.log('Error posting favorite:', error);
    }
}

function* fetchFavorites(action){
    const childID = action.payload;
    console.log(childID)
    try{ 
        const favorites = yield axios({
            method: 'GET',
            url: `/api/favorites/${childID}`
        })
        yield put({
            type:'SET_FAVORITES',
            payload:favorites.data
        })
    }
    catch (error) {
        console.log('Error getting favorites:', error);
    }
}

function* deleteFavorite(action){
    
}

function* favoritesSaga(){
    yield takeLatest('SAGA_ADD_FAVORITE', addFavorite),
    yield takeLatest('SAGA_FETCH_FAVORITES', fetchFavorites),
    yield takeLatest('SAGA_DELETE_FAVORITE', deleteFavorite)
;}

export default favoritesSaga;