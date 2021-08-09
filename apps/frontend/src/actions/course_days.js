import axios from "axios";
import {GET_COURSE_DAY, GET_COURSE_DAYS, UPDATE_COURSE_DAY} from "./types";

// GET_COURSE_DAYS
export const getCourseDays = (id) => (dispatch) => {
  axios
    .get(`/api/weeks/${id}/day_list/`)
    .then(res => {
      dispatch({
        type: GET_COURSE_DAYS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET_COURSE_DAY
export const getCourseDay = (id) => (dispatch) => {
  axios
    .get(`/api/days/${id}/`)
    .then(res => {
      dispatch({
        type: GET_COURSE_DAY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// UPDATE_COURSE_DAY
export const updateCourseDay = (id, data, callback_func) => (dispatch) => {
  axios
    .patch(`/api/days/${id}/`, data)
    .then(res => {
      dispatch({
        type: UPDATE_COURSE_DAY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err))
    .then(callback_func);
};