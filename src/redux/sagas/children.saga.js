import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';



function* fetchChildren(action){
    console.log(action.payload);
    try{ 
        const children = yield axios({
            method: 'GET',
            url: '/api/children',
        })
        yield put({
            type:'SET_CHILDREN',
            payload: children.data
        })
    }
    catch (error) {
        console.log('Error getting children:', error);
    }
}



function* childrenSaga(){
    yield takeLatest('SAGA_GET_CHILDREN', fetchChildren);
}

export default childrenSaga;