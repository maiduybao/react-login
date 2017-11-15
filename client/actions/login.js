import {LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED} from "./types";
import {ACCESS_TOKEN, LOGIN_API_URL} from "../constants";

const logger = console;

function setLoginPending(isLoginPending) {
    return {
        type: LOGIN_PENDING,
        payload: isLoginPending
    };
}

function setLoginSuccess(isLoginSuccess) {
    return {
        type: LOGIN_FULFILLED,
        payload: isLoginSuccess
    };
}

function setLoginError(loginError) {
    return {
        type: LOGIN_REJECTED,
        payload: loginError
    };
}

export default function login(credentials) {
    return (dispatch) => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        return fetch(LOGIN_API_URL, {
            method: "post",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(credentials)
        })
        .then((res) => res.json())
        .then((data) => {
            const {error, accessToken, tokenType} = data;
            dispatch(setLoginPending(false));
            if (error) {
                dispatch(setLoginError(error.message));
                return false;
            }
            dispatch(setLoginSuccess(true));
            localStorage.setItem(ACCESS_TOKEN, `${tokenType} ${accessToken}` || "");
            return true;
        })
        .catch((ex) => {
            logger.error(ex);
            dispatch(setLoginPending(false));
            dispatch(setLoginError("Could not connect to the server"));
        });
    };
}


