import { call, put, all, takeEvery} from 'redux-saga/effects'
import axios from 'axios';
import { user_add, att_add, date_add } from "./actions";

function* getAttendanceByDate(action){
    try {
        let date_string = action.payload.date.split('-');
        let formatted_date = '';
        date_string.map(x => {
           formatted_date += x;
        });

        const res = yield axios.get('/attendance/get/'+formatted_date);
        console.log(res);

        let user_list = [];
        for(let i=0; i<res.data.length; ++i) {
            user_list.push({
                'user': res['data'][i]['user'],
                'attendance': res['data'][i]['first_ts'],
            });
        }

        yield put(date_add(action.payload.date, user_list));
    }
    catch (e) {
        console.log(e);
    }
}

export function* getAttendanceByDateSaga() {
    yield takeEvery("DATE_ADD_REQUEST", getAttendanceByDate);
}

export function* getTotalAttendance(){
    try {
	    const res = yield axios.get('/attendance/gets');
	    console.log(res);
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
        for(let i=0; i<res['data'].length; ++i){
            yield put(user_add(i, res['data'][i]));
        }
    } catch (e) {
        console.log(e);
    }
}

export default function* rootSaga() {
    yield all([
        getUsers(),
        getTotalAttendance(),
        getAttendanceByDateSaga()
    ]);
}
