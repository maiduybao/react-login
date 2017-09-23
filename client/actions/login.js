import {LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED} from "./types";
import {ACCESS_TOKEN} from "../components/common/constants";

const API_URI = "http://localhost:8080/api/v1";
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

        return fetch(API_URI + "/authenticate", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        .then((res) => res.json())
        .then((data) => {
            const {error, accessToken} = data;
            dispatch(setLoginPending(false));
            if (error) {
                dispatch(setLoginError(error.message));
                return false;
            }
            dispatch(setLoginSuccess(true));
            sessionStorage.setItem(ACCESS_TOKEN, accessToken || "");
            return true;
        })
        .catch((ex) => {
            logger.error(ex.message);
            dispatch(setLoginError("Could not connect to the server"));
            dispatch(setLoginPending(false));
        });
    };
}


