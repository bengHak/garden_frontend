import { put, call, all} from 'redux-saga/effects'
import axios from 'axios';
import { user_add } from "./actions";

require('dotenv').config();

function* helloSaga() {
    console.log('Hello Sagas!')
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
        getUsers()
    ]);
}
