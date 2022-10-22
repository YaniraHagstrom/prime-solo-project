import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';



function* fetchChildren(){
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

function* fetchChild(action){
    const childID = action.payload;
    try{ 
        const child = yield axios({
            method: 'GET',
            url: `api/child/${childID}`
        })
        // yield console.log('child data:',child.data[0]);
        yield put({
            type:'SET_CHILD',
            payload: child.data[0]
        })
    }
    catch (error) {
        console.log('Error getting child:', error);
    }
}

function* updateChild(action){
    const childID = action.payload.child_id;
    try{ 
        const childToUpdate = yield axios({
            method: 'PUT',
            url: `api/child/${childID}`,
            data: action.payload
        })
        // yield console.log('child data:',child.data[0]);
        yield put({
            type:'SAGA_GET_RESULTS',
            payload: childID
        })
    }
    catch (error) {
        console.log('Error getting child:', error);
    }
}




function* childrenSaga(){
    yield takeLatest('SAGA_GET_CHILDREN', fetchChildren),
    yield takeLatest('SAGA_FETCH_CHILD', fetchChild),
    yield takeLatest('SAGA_UPDATE_CHILD', updateChild)
    ;
}

export default childrenSaga;