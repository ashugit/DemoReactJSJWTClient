import * as types from './types';
import {push} from 'react-router-redux';
/**
 * 
 * @param {*} token 
 * @param {*} role 
 */
export function invalidateToken(token, role) {
    return {
        type: types.INVALIDATE_TOKEN,
        token: token,
        role: role
    };
}

/**
 * 
 */
export function logout() {
    return (dispatch) => {
        dispatch(invalidateToken('', ''));
        dispatch(push('/session/login'));
    };
}

/**
 * 
 * @param {*} token 
 * @param {*} role 
 */
export function login(token, role) {
    return (dispatch) => {
        dispatch(invalidateToken(token, role));
        if (role === 'admin') {
            dispatch(push('/dashboard/users'));
        }else {
            dispatch(push('/dashboard/home'));
        }
    };
}
/**
 * 
 * @param {*} token 
 * @param {*} role 
 */
export function signup(token, role) {
    return (dispatch) => {
        dispatch(invalidateToken(token, role));
        if (role === 'admin') {
            dispatch(push('/dashboard/users'));
        }else {
            dispatch(push('/dashboard/home'));
        }
    };
}
