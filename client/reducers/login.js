import {LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED} from "../actions/types";

const initialState = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_PENDING:
            state = {
                ...state,
                isLoginPending: action.payload
            };
            break;
        case LOGIN_FULFILLED:
            state = {
                ...state,
                isLoginSuccess: action.payload
            };
            break;
        case LOGIN_REJECTED:
            state = {
                ...state,
                loginError: action.payload
            };
            break;
        default:
            state = {...state};
    }

    return state;
}