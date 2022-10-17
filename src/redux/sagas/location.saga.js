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
//** Need to send location data to the database and create a reducer to render location on user page */
function* postLocation(action){
    const locationData = action.payload;
    console.log('location data',locationData)
    // try{ 
    //     const userDestination = yield axios({
    //         method: 'POST',
    //         url: `/api/location/${locationData}`
    //     })
    //     yield put({
    //         type: 'SET_LOCATION',
    //         payload: userDestination.data
    //     })
    // }
    // catch (error) {
    //     console.log('Error with fetching cities:', error);
    // }
}







function* locationSaga(){
    yield takeLatest('SAGA_GET_COUNTRIES', getCountries),
    yield takeLatest('SAGA_GET_CITIES', getCities),
    yield takeLatest('SAGA_ADD_LOCATION', postLocation)
}

export default locationSaga;
