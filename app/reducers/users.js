import * as types from '../actions/types';

/**
 * 
 */
const getDefaultError = () => {
    return {
        cause: '',
        text: '',
    };
};


/**
 * 
 */
const getInitialState = ()=>{
    return {
        users: [],
        totalCount: 0,
        displayables: [],
        displayablesOnPage: [],
        loaded: false,
        busy: false,
        page: 1,
        displayPerPage: 5,
        error: getDefaultError(),
        filter: {
            filterOn: '',
            filterString: ''
        },
        sorting: {
            sortOn: 'created_at',
            sortDirection: 'd'
        }

    };
};

const pageIn = (state) => {
    state.displayablesOnPage = state.displayables.splice((state.page - 1) 
                                    * state.displayPerPage, state.displayPerPage);
};

const filter = (state) => {
    if(state.filter.filterOn) {
        state.displayables = state.users.filter(e => (e[state.filter.filterOn] ===  state.filter.filterString) ? true : false);
    } else{
        state.displayables = state.users;
    }
    state.totalCount = state.displayables.length;
};

const sort = (state) => {
    state.displayables = state.displayables.sort( (a, b)=>{
        const col = state.sorting.sortOn;
        let ret = 0;
        if(!col) return ret;
        if(state.sorting.sortDirection === 'a') {
            ret = a[col] > b[col] ? 1 : -1;
        }else{
            ret = a[col] < b[col] ? 1 : -1;
        }
        return ret;
    }); 
};

/**
 * 
 * @param {*} state 
 * @param {*} newState 
 */
const applyNewSort = (state, newState) => {
    if(state.sorting.sortOn === newState.sorting.sortOn) {
        if(state.sorting.sortDirection === 'a') {
            newState.sorting.sortDirection = 'd';
        }else{
            newState.sorting.sortDirection = 'a';
        }
    }else{
        newState.sorting.sortDirection = 'a';
    }
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const users = (state = getInitialState(), action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case types.USER_BUSY_FETCHING_FROM_BACKEND:
            newState.busy = true;
            return newState;
        case types.USERS_FETCHED_FROM_BACKEND:
            newState.loaded = true;
            newState.users = action.users;
            newState.page = 1;
            filter(newState);
            sort(newState);
            newState.error = getDefaultError(); // clear the error
            return newState;
        case types.USERS_FETCH_FAILED_FROM_BACKEND:
            newState.error.cause = 'LOAD';
            newState.error = action.error; // set the error    
            return newState;
        case types.USERS_APPLY_SORT:
            newState.sorting.sortOn = action.field;
            applyNewSort(state, newState);
            sort(newState);
            return newState;
        case types.USERS_MOVE_TO_PAGE:
            const maxPage =  Math.floor(state.totalCount / newState.displayPerPage) +
                            ((state.totalCount % newState.displayPerPage) ? 1 : 0);
            if(action.page > maxPage) {
                newState.page = maxPage;                        
            } else if (action.page < 1) {
                newState.page = 1;                        
            } else {
                newState.page = action.page;
            }
            return newState;
        case types.USERS_CHANGE_PER_PAGE_COUNT:
            if(action.count < 5) {
                newState.displayPerPage = 5;
            }else if(action.count > 100) {
                newState.displayPerPage = 100;
            }else{
                newState.displayPerPage = action.count;
            }
            newState.page = 1;
            return newState;
        case types.USERS_UPDATE_FILTER:
            newState.filter.filterOn = action.filter.filterOn;
            newState.filter.filterString = action.filter.filterString;
            newState.page = 1;
            filter(newState);
            sort(newState);
            return newState;
        case types.USERS_DELETE_USER:
            const deleteid = action.id;
            const index = newState.users.findIndex(u => u.id === deleteid);
            newState.users.splice(index, 1);
            filter(newState);
            sort(newState);
            return newState;
        case types.USERS_UPDATE_USER:
            const updateid = action.id;
            const updateIndex = newState.users.findIndex(u => u.id === updateid);
            newState.users[updateIndex].name = action.name;
            filter(newState);
            sort(newState);
            return newState;
        case types.USERS_CREATED_USER:
            newState.users.push(action.user);
            filter(newState);
            sort(newState);
            return newState;
    }
    return state; // ignore
};

export default users;
