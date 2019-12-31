import { put, all} from 'redux-saga/effects'
import axios from 'axios';
import { user_add, att_add } from "./actions";

require('dotenv').config();

// function* helloSaga() {
//     console.log('Hello Sagas!')
// }

// function* getAttendanceByDate(date){
//     try {
//         const res = yield axios.get('/attendance/get/'+date);
//         yield put();
//     }
//     catch (e) {
//         console.log(e);
//     }
// }

export function* getTotalAttendance(){
    try {
        const res = yield axios.get('/attendance/gets');

        for(let i=0; i<res.data.length; ++i){
            yield put(att_add(i, res['data'][i]['user'], res['data'][i]['attendances']));
        }
    }
    catch (e) {
        console.log(e);
    }
}

export function* getUsers(){
    try {
        const res = yield axios.get('/attendance/users');
        //console.log(res['data']);
        for(let i=0; i<res['data'].length; ++i){
            //console.log(res['data'][i]);
            yield put(user_add(i, res['data'][i]));
        }
    } catch (e) {
        console.log(e);
    }
}

export default function* rootSaga() {
    yield all([
        getUsers(),
        getTotalAttendance()
    ]);
}
