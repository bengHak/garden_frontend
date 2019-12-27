import users from './user';
import attend from './attend';

import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    users: users,
    attendance: attend,
});

export default rootReducers;