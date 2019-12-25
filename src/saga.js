import { put, call, all} from 'redux-saga/effects'

require('dotenv').config();

function* helloSaga() {
    console.log('Hello Sagas!')
}

export function* getUsers(){
    try {
        const test = yield call(fetch, process.env.HOST+'users/');
        const json = yield test.json();
        console.log(json);
    } catch (e) {
        console.log(e);
    }
}

export default function* rootSaga() {
    yield all([
        getUsers()
    ]);
}
