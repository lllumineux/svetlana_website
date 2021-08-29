import axios from "axios";
import {GET_CONTACT_INFO, GET_GENERAL_INFO, UPDATE_GENERAL_INFO} from "./types";
import {tokenConfig} from "./auth";

// GET_GENERAL_INFO
export const getGeneralInfo = () => (dispatch, getState) => {
    axios
        .get("/api/general_info/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_GENERAL_INFO,
                payload: res.data[0]
            });
        })
        .catch((err) => console.log(err))
};

// UPDATE_GENERAL_INFO
export const updateGeneralInfo = (general_info_id, data, callback_func) => (dispatch, getState) => {
    axios
        .patch(`/api/general_info/${general_info_id}/`, data, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_GENERAL_INFO,
                payload: res.data
            });
            callback_func();
        })
        .catch((err) => console.log(err))
};

// GET_CONTACT_INFO
export const getContactInfo = () => (dispatch, getState) => {
    axios
        .get("/api/general_info/contact_info/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CONTACT_INFO,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};
