const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

const defaultState = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "LOGIN_PENDING":
            state = {...state, isLoginPending: action.payload}; // create new state
            break;
        case "LOGIN_SUCCESS":
            state = {...state, isLoginSuccess: action.payload};
            break;
        case "LOGIN_ERROR":
            state = {...state, loginError: action.payload};
            break;
    }
    return state;
}