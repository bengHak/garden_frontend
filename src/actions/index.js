import * as types from './ActionTypes'

export const user_add = (id, name) => ({
    type: types.USER_ADD,
    id: id,
    name: name,
});