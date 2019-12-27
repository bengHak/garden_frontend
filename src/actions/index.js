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