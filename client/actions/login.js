import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URI = "https://localhost:8443/api/user";

export default function login(credentials) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        return axios.post(API_URI + "/authenticate", credentials)
            .then(res => {
                const {data} = res;
                if (data.success === false) {
                    dispatch(setLoginError(data.message));
                    return false;
                }
                dispatch(setLoginSuccess(true));
                const {token} = data.payload;
                sessionStorage.setItem("access_token", token);
                const tokenData = jwtDecode(token);
                const user = {
                    id: tokenData.sub,
                    email: tokenData.email,
                    roles: tokenData.roles
                };
                sessionStorage.setItem("principle", JSON.stringify(user));
                return true;
            })
            .catch(err => {
                dispatch(setLoginError(err.message));
                throw err;
            });
    }
}


function setLoginPending(isLoginPending) {
    return {
        type: "LOGIN_PENDING",
        payload: isLoginPending
    };
}

function setLoginSuccess(isLoginSuccess) {
    return {
        type: "LOGIN_SUCCESS",
        payload: isLoginSuccess
    };
}

function setLoginError(loginError) {
    return {
        type: "LOGIN_ERROR",
        payload: loginError
    }
}