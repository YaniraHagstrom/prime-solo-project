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
        yield put({
            type: 'SAGA_FETCH_FAVORITES',
            payload: action.payload.childID
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
    // console.log(action.payload)
    const childID = action.payload.child_id;
    const providerID = action.payload.provider_id
    // console.log(childID, providerID)
    try{ 
        const favoriteToDelete = yield axios({
            method: 'DELETE',
            url: `/api/favorites/${childID}`,
            data: {providerID}})
        // yield put({
        //     type: 'SAGA_CLEAR_FAVORITES'
        // })
        yield put({
            type:'SAGA_FETCH_FAVORITES',
            payload: childID
        })
    }
    catch (error) {
        console.log('Error getting favorites:', error);
    }
}

function* favoritesSaga(){
    yield takeLatest('SAGA_ADD_FAVORITE', addFavorite),
    yield takeLatest('SAGA_FETCH_FAVORITES', fetchFavorites),
    yield takeLatest('SAGA_DELETE_FAVORITE', deleteFavorite)
;}

export default favoritesSaga;