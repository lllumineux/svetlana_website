import axios from "axios";
import {ADD_SCREENSHOT, DELETE_SCREENSHOT, GET_SCREENSHOTS, UPDATE_SCREENSHOT} from "./types";
import {tokenConfig} from "./auth";

// GET_SCREENSHOTS
export const getScreenshots = () => (dispatch, getState) => {
    axios
        .get("/api/screenshots/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SCREENSHOTS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// DELETE_SCREENSHOT
export const deleteScreenshot = (screenshot_id) => (dispatch, getState) => {
    axios
        .delete(`/api/screenshots/${screenshot_id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_SCREENSHOT,
                payload: res.data.id
            });
        })
        .catch((err) => console.log(err))
};

// ADD_SCREENSHOT
export const addScreenshot = (data) => (dispatch, getState) => {
    axios
        .post(`/api/screenshots/`, data, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_SCREENSHOT,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// UPDATE_SCREENSHOT
export const updateScreenshot = (screenshot_id, data) => (dispatch, getState) => {
    axios
        .patch(`/api/screenshots/${screenshot_id}/`, data,  tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_SCREENSHOT,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};