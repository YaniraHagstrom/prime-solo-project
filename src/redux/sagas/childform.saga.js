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

function* addChild(action){
    const newChildData = action.payload;
    console.log(newChildData);
    try{ 
        const newChild = yield axios({
            method: 'POST',
            url: '/api/child',
            data: newChildData
        })

    }
    catch (error) {
        console.log('Error with adding child:', error);
    }
}



function* childFormSaga(){
    yield takeLatest('SAGA_FETCH_SERVICES', fetchServices),
    yield takeLatest('SAGA_FETCH_LANGUAGES', fetchLanguages)
    yield takeLatest('SAGA_ADD_CHILD', addChild);
    
}

export default childFormSaga;