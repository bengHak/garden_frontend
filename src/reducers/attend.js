import * as types from '../actions/ActionTypes';

const attend = (state = [], action) => {
    switch (action.type) {
        case types.USER_ATT_ADD:
            return [
                ...state,
                {
                    id: action.id,
                    username: action.username,
                    attendance: action.attendance,
                }
            ];
        default:
            return state
    }
};

export default attend;