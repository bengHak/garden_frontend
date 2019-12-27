import * as types from '../actions/ActionTypes';

const users = (state = [], action) => {
    switch (action.type) {
        case types.USER_ADD:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                }
            ];
        default:
            return state
    }
};

export default users;