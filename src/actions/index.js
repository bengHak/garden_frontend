import * as types from './ActionTypes'

export const user_add = (id, name) => ({
    type: types.USER_ADD,
    id: id,
    name: name,
});

export const att_add = (id, name, attendance) => ({
    type: types.USER_ATT_ADD,
    id: id,
    username: name,
    attendance: attendance,
});

export const date_add = (id,date, user_list) => ({
    type: types.DATE_ADD,
    date: date,
    user_list: user_list
});