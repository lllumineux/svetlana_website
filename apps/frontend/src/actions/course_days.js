import axios from "axios";
import {GET_COURSE_DAY, GET_COURSE_DAYS, UPDATE_COURSE_DAY} from "./types";
import {tokenConfig} from "./auth";

// GET_COURSE_DAYS
export const getCourseDays = (course_id, week_number) => (dispatch, getState) => {
  axios
    .get(`/api/weeks/day_list?course_id=${course_id}&week_number=${week_number}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_COURSE_DAYS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET_COURSE_DAY
export const getCourseDay = (course_id, week_number, day_number) => (dispatch, getState) => {
  axios
    .get(`/api/days/day_by_info?course_id=${course_id}&week_number=${week_number}&day_number=${day_number}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_COURSE_DAY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// UPDATE_COURSE_DAY
export const updateCourseDay = (id, data, callback_func) => (dispatch, getState) => {
  axios
    .patch(`/api/days/${id}/`, data, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_COURSE_DAY,
        payload: res.data,
      });
    })
    .then(res => callback_func())
    .catch((err) => console.log(err))
};
