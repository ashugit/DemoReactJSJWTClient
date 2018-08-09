require('es6-object-assign/auto');
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import session from './session';
import users from './users';

/**
 *
 */
const rootReducer = combineReducers({
    session,
    users,
    routing
});

export default rootReducer;
