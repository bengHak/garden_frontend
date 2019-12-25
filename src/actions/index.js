import * as types from './ActionTypes'

export const user_add = (name) => ({
    type: types.USER_ADD,
    name: name,
});