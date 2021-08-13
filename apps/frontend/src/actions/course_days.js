import axios from "axios";
import {GET_COURSE_DAY, GET_COURSE_DAYS, UPDATE_COURSE_DAY} from "./types";
import {updateReportQuestion, updateReportQuestions, updateReportQuestionsByDayId} from "./reports";

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
export const updateCourseDay = (id, data1, data2_list, callback_func) => (dispatch) => {
  axios
    .patch(`/api/days/${id}/`, data1)
    .then(res => {
      dispatch({
        type: UPDATE_COURSE_DAY,
        payload: res.data,
      });
    })
    .then(() => {
      data2_list.map(data => updateReportQuestion(data))
      callback_func();
    })
    .catch((err) => console.log(err))
};