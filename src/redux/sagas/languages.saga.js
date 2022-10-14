import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

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
        console.log('Error with user logout:', error);
    }
}

function* languagesSaga(){
    yield takeLatest('SAGA_FETCH_LANGUAGES', fetchLanguages);
}

export default languagesSaga;