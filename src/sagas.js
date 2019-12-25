import { put, call, all} from 'redux-saga/effects'

require('dotenv').config();

function* helloSaga() {
    console.log('Hello Sagas!')
}

export function* getUsers(){
    try {
        //const test = yield call(fetch, 'http://'+process.env.MONGO_HOST+'/users/');
        const test = yield call(fetch, '/attendance/users');
        const json = yield test;
        console.log(test);
        console.log(json['body']);
    } catch (e) {
        console.log(e);
    }
}

export default function* rootSaga() {
    yield all([
        getUsers()
    ]);
}
