import * as types from '../actions/ActionTypes';

const date = (state = [], action) => {
    switch (action.type) {
        case types.DATE_ADD:
            return [
                ...state,
                {
                    date: action.date,
                    user_list: action.user_list,
                }
            ];
        default:
            return state
    }
};

export default date;