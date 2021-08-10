import axios from "axios";
import {GET_CONTACT_INFO, GET_GENERAL_INFO, UPDATE_GENERAL_INFO} from "./types";

// GET_GENERAL_INFO
export const getGeneralInfo = () => (dispatch) => {
    axios
        .get("/api/general_info/", {
        })
        .then(res => {
            dispatch({
                type: GET_GENERAL_INFO,
                payload: res.data[0]
            });
        })
        .catch((err) => console.log(err))
};

// UPDATE_GENERAL_INFO
export const updateGeneralInfo = (general_info_id, data, callback_func) => (dispatch) => {
    axios
        .patch(`/api/general_info/${general_info_id}/`, data, {
        })
        .then(res => {
            dispatch({
                type: UPDATE_GENERAL_INFO,
                payload: res.data[0]
            });
        })
        .catch((err) => console.log(err))
        .then(callback_func())
};

// GET_CONTACT_INFO
export const getContactInfo = () => (dispatch) => {
    axios
        .get("/api/general_info/contact_info/", {
        })
        .then(res => {
            dispatch({
                type: GET_CONTACT_INFO,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};
