import * as types from '../actions/types';
import {Persistence} from '../services/persistence';

const getDefaultSession = () => {
    let isLoggedIn = false;
    let isAdmin = false;
    const token = new Persistence().get('token');
    if(token) isLoggedIn = true;
    if(new Persistence().get('role') === 'admin') isAdmin = true;
    
    return {isLoggedIn, isAdmin};
};


/**
 *
 * @param {*} state 
 * @param {*} action 
 */
const session = (state = getDefaultSession(), 
    action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case types.INVALIDATE_TOKEN:
            new Persistence().store('token', action.token);
            new Persistence().store('role', action.role);
            newState.isLoggedIn = action.token ? true : false;
            newState.isAdmin = action.role === 'admin' ? true : false;
            return newState;
    }

    return state;
};

export default session;
