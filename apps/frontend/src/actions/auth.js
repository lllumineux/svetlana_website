import axios from "axios";
import {returnErrors} from "./messages";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_FAIL, GET_ERRORS
} from "./types";


// LOAD USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});
    axios
        .get("/api/auth/user/", tokenConfig(getState))
        .then(res => {
          dispatch({
              type: USER_LOADED,
              payload: res.data,
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err.response.data, err.response.status));
          dispatch({type: AUTH_ERROR})
        });
};

// LOGIN USER
export const login = (username, password, callback_func) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({ username, password });

    axios
        .post("/api/auth/login/", body, config)
        .then(res => {
          dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data,
          });
          callback_func();
        })
        .catch((err) => {
          dispatch(returnErrors(err.response.data, err.response.status));
          dispatch({type: LOGIN_FAIL})
});
};

// SIGNUP USER
export const signup = ({username, password}, callback_func) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({ username, password });

    axios
        .post("/api/auth/register/", body, config)
        .then(res => {
          dispatch({
              type: SIGNUP_SUCCESS,
              payload: res.data,
          });
          callback_func();
        })
        .catch((err) => {
          const errors = {
            msg: err.response.data,
            status: err.response.status
          }
          dispatch({
            type: GET_ERRORS,
            payload: errors
          });
          dispatch({type: SIGNUP_FAIL})
        });
};

// LOGOUT_USER
export const logout = () => (dispatch, getState) => {
    axios
        .post("/api/auth/logout/", null, tokenConfig(getState))
        .then(res => {
          dispatch({
              type: LOGOUT_SUCCESS
          });
        })
        .catch((err) => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
