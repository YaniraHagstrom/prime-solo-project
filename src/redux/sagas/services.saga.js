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

function* servicesSaga(){
    yield takeLatest('SAGA_FETCH_SERVICES', fetchServices);
}

export default servicesSaga;