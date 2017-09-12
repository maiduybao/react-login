import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URI = "https://localhost:8443/api/user";
function setLoginPending(isLoginPending) {
    return {
        type: "LOGIN_PENDING",
        payload: isLoginPending
    };
}

function setLoginSuccess(isLoginSuccess) {
    return {
        type: "LOGIN_FULFILLED",
        payload: isLoginSuccess
    };
}

function setLoginError(loginError) {
    return {
        type: "LOGIN_REJECTED",
        payload: loginError
    };
}

export default function login(credentials) {
    return (dispatch) => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        return axios.post(API_URI + "/authenticate", credentials)
            .then((res) => {
                const {data} = res;
                dispatch(setLoginPending(false));
                if (data.success === false) {
                    dispatch(setLoginError(data.error));
                    return false;
                }
                dispatch(setLoginSuccess(true));
                const {token} = data.payload;
                sessionStorage.setItem("access_token", token);
                const tokenData = jwtDecode(token);
                const {user} = tokenData;
                sessionStorage.setItem("principle", JSON.stringify(user));
                return true;
            })
            .catch((err) => {
                dispatch(setLoginError("Login API is not available"));
                dispatch(setLoginPending(false));
                throw err;
            });
    };
}


