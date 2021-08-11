import axios from "axios";
import {GET_COURSE_WEEK, GET_COURSE_WEEKS, UPDATE_COURSE_WEEK} from "./types";


// GET_COURSE_WEEKS
export const getCourseWeeks = (id) => (dispatch) => {
  axios
    .get(`/api/courses/${id}/week_list/`)
    .then(res => {
      dispatch({
        type: GET_COURSE_WEEKS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET_COURSE_WEEK
export const getCourseWeek = (id) => (dispatch) => {
  axios
    .get(`/api/weeks/${id}/`)
    .then(res => {
      dispatch({
        type: GET_COURSE_WEEK,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// UPDATE_COURSE_WEEK
export const updateCourseWeek = (id, course_week, callback_func) => (dispatch) => {
  axios
    .patch(`/api/weeks/${id}/`, course_week)
    .then(res => {
      dispatch({
        type: UPDATE_COURSE_WEEK,
        payload: res.data,
      });
      callback_func();
    })
    .catch((err) => console.log(err))
};