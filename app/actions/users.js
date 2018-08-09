import * as types from './types';
import { DemoService }  from '../services/demo';


/**
 * 
 */
function usersFetching() {
    return {
        type: types.USER_BUSY_FETCHING_FROM_BACKEND
    };
}
/**
 * 
 * @param {*} users 
 */
function usersFetched(users) {
    return {
        type: types.USERS_FETCHED_FROM_BACKEND,
        users: users
    };
}

/**
 * 
 * @param {*} error 
 */
function failedToFetchUsers(error) {
    return {
        type: types.USERS_FETCH_FAILED_FROM_BACKEND,
        error: error
    };
}

/**
 * 
 */
export function loadUsers() {
    return (dispatch, getState) => {
        const state = getState();
        
        if(state.users.loaded) return; // Skip loading again

        dispatch(usersFetching());
        new DemoService().getUsersPage(0).then( response => {
            // Notify we downloaded a page
            if (response) dispatch(usersFetched(response.data));
            return true;
        }).catch(err => {
            let error = 'failed to fetch users';
            if(err && err.response && err.response.data && err.response.data.reason) {
                error = err.response.data.reason;
            }
            dispatch(failedToFetchUsers(error));
        });
    };
}
/**
 * 
 * @param {*} field 
 */
export function applySort(field) {
    return {
        type: types.USERS_APPLY_SORT,
        field: field
    };
}


/**
 * 
 * @param {*} count 
 */
export function updatePerPageCount(count) {
    return {
        type: types.USERS_CHANGE_PER_PAGE_COUNT,
        count: count
    };
}


/**
 * 
 * @param {*} count 
 */
export function moveToPage(page) {
    return {
        type: types.USERS_MOVE_TO_PAGE,
        page: page
    };
}
