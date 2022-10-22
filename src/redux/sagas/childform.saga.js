import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchServices(){
    try{ 
        const services = yield axios({
            method: 'GET',
            url: '/api/services'
        })
        yield put({
            type: 'SET_SERVICES',
            payload: services.data
        })
    }
    catch (error) {
        console.log('Error with fetching services:', error);
    }
}

function* fetchLanguages(){
    try{ 
        const languages = yield axios({
            method: 'GET',
            url: '/api/languages'
        })
        yield put({
            type: 'SET_LANGUAGES',
            payload: languages.data
        })
    }
    catch (error) {
        console.log('Error with fetching languages:', error);
    }
}

function* searchProviders(action){
    const childID = action.payload.child_id;
    try{ 
        const searchResults = yield axios({
            method: 'GET',
            url: `/api/child/search/${childID}`
        })
        yield put({
            type: 'SET_RESULTS',
            payload: searchResults.data
        })
        // need to put the child ID in the childData reducer to access for adding provider to favorites table;
        yield put({
            type: 'UPDATE_CHILD_DATA',
            payload: childID
        })
    }
    catch (error) {
        console.log('Error with updating child:', error);
    }
}

function* childFormSaga(){
    yield takeLatest('SAGA_FETCH_SERVICES', fetchServices),
    yield takeLatest('SAGA_FETCH_LANGUAGES', fetchLanguages)
    yield takeLatest('SAGA_GET_RESULTS', searchProviders)
;}

export default childFormSaga;