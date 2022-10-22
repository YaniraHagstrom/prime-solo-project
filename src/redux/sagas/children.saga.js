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
            payload: {child_id: childID}
        })
    }
    catch (error) {
        console.log('Error updating child:', error);
    }
}

function* addChild(action){
    const newChildData = action.payload;
    console.log('newChildData:',newChildData);
    try{ 
        const newChild = yield axios({
            method: 'POST',
            url: '/api/child',
            data: newChildData
        })
        yield console.log('newChildID:',newChild.data.child_id);
        // need to add the child ID in the childReducer to access for adding provider to favorites table;
        yield put({
            type: 'UPDATE_CHILD_DATA',
            payload: newChild.data.child_id
                })
        yield console.log('newChildID:',newChild.data.child_id);
        yield put({
            type:'SAGA_GET_RESULTS',
            payload: newChild.data
            // newChild.data looks like:
            // { child_id: 1 }
        })

    }
    catch (error) {
        console.log('Error with adding child:', error);
    }
}




function* childrenSaga(){
    yield takeLatest('SAGA_FETCH_CHILDREN', fetchChildren),
    yield takeLatest('SAGA_FETCH_CHILD', fetchChild),
    yield takeLatest('SAGA_UPDATE_CHILD', updateChild)
    yield takeLatest('SAGA_ADD_CHILD', addChild)
    ;
}

export default childrenSaga;