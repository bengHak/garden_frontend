import users from './user';
import attend from './attend';
import date from './dates';

import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    users: users,
    attendance: attend,
    dates: date,
});

export default rootReducers;