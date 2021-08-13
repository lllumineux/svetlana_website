import axios from "axios";
import {ADD_SCREENSHOT, DELETE_SCREENSHOT, GET_SCREENSHOTS, UPDATE_SCREENSHOT} from "./types";

// GET_SCREENSHOTS
export const getScreenshots = () => (dispatch) => {
    axios
        .get("/api/screenshots/", {
        })
        .then(res => {
            dispatch({
                type: GET_SCREENSHOTS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// DELETE_SCREENSHOT
export const deleteScreenshot = (screenshot_id) => (dispatch) => {
    axios
        .delete(`/api/screenshots/${screenshot_id}/`, {
        })
        .then(res => {
            dispatch({
                type: DELETE_SCREENSHOT,
                payload: res.data.id
            });
        })
        .catch((err) => console.log(err))
};

// ADD_SCREENSHOT
export const addScreenshot = (data) => (dispatch) => {
    axios
        .post(`/api/screenshots/`, data, {
        })
        .then(res => {
            dispatch({
                type: ADD_SCREENSHOT,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// UPDATE_SCREENSHOT
export const updateScreenshot = (screenshot_id, data) => (dispatch) => {
    axios
        .patch(`/api/screenshots/${screenshot_id}/`, data,  {
        })
        .then(res => {
            dispatch({
                type: UPDATE_SCREENSHOT,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};