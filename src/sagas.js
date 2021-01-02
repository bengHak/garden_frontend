import { call, put, all, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { user_add, att_add, date_add } from "./actions";
import { getKoreaDateString } from "./libs";

function* getAttendanceByDate(action) {
  try {
    let date_string = action.payload.date.split("-");
    let formatted_date = "";
    date_string.map((x) => {
      formatted_date += x;
    });

    console.log(formatted_date);
    const res = yield axios.get("/v1/get/" + formatted_date);
    console.log(res);

    let user_list = [];
    for (let i = 0; i < res.data.length; ++i) {
      user_list.push({
        user: res["data"][i]["user"],
        attendance: res["data"][i]["first_ts"],
      });
    }

    yield put(date_add(action.payload.date, user_list));
  } catch (e) {
    console.log(e);
  }
}

export function* getAttendanceByDateSaga() {
  yield takeEvery("DATE_ADD_REQUEST", getAttendanceByDate);
}

export function* getTotalAttendance() {
  try {
    const todayString = getKoreaDateString(new Date());
    const res = yield axios.get("/v1/get/" + todayString);
    console.log(todayString);
    console.log(res["data"]);
    for (let i = 0; i < res.data.length; ++i) {
      yield put(
        att_add(i, res["data"][i]["username"], res["data"][i]["isCommit"])
      );
    }
  } catch (e) {
    // console.log(e);
  }
}

export function* getUsers() {
  try {
    const res = yield axios.get("/v1/username");
    console.log(res["data"]["committers"]);
    for (let i = 0; i < res["data"]["committers"].length; ++i) {
      yield put(user_add(i, res["data"]["committers"][i]));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield all([getUsers(), getTotalAttendance(), getAttendanceByDateSaga()]);
}
