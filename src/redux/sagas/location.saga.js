import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* getCountries(){
    try{ 
        const countries = yield axios({
            method: 'GET',
            url: '/api/location/countries'
        })
        yield put({
            type: 'SET_COUNTRIES',
            payload: countries.data
        })
    }
    catch (error) {
        console.log('Error with fetching countries:', error);
    }
}

function* getCities(action){
    const country_id = action.payload;
    try{ 
        const countries = yield axios({
            method: 'GET',
            url: `/api/location/cities/${country_id}`
        })
        yield put({
            type: 'SET_CITIES',
            payload: countries.data
        })
    }
    catch (error) {
        console.log('Error with fetching cities:', error);
    }
}







function* locationSaga(){
    yield takeLatest('SAGA_GET_COUNTRIES', getCountries),
    yield takeLatest('SAGA_GET_CITIES', getCities)
}

export default locationSaga;
