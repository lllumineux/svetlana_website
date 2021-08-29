import axios from "axios";
import {createMessage} from "./messages";

import {
    GET_COURSES,
    DELETE_COURSE,
    INVERT_COURSE_VISIBILITY,
    ADD_COURSE,
    GET_COURSE,
    UPDATE_COURSE,
    GET_ERRORS
} from "./types";
import {tokenConfig} from "./auth";


// GET COURSES
export const getCourses = () => (dispatch, getState) => {
  axios
    .get("/api/courses/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_COURSES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET COURSE
export const getCourse = (id) => (dispatch, getState) => {
  axios
    .get(`/api/courses/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_COURSE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// ADD_COURSE
export const addCourse = (course, callback_func) => (dispatch, getState) => {
  axios
    .post(`/api/courses/`, course, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_COURSE,
        payload: res.data
      });
      callback_func();
    })
    .catch(err => {
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        });
    });
};

// DELETE COURSE
export const deleteCourse = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/courses/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({deleteCourse: "Курс удалён"}));
      dispatch({
        type: DELETE_COURSE,
        payload: id
      });
    })
    .catch((err) => console.log(err));
};

// UPDATE_COURSE
export const updateCourse = (id, course, callback_func) => (dispatch, getState) => {
  axios
    .patch(`/api/courses/${id}/`, course, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_COURSE,
        payload: res.data
      });
      callback_func();
    })
    .catch((err) => console.log(err))
};

// INVERT_COURSE_VISIBILITY
export const invertCourseVisibility = (id) => (dispatch, getState) => {
  axios
    .patch(`/api/courses/${id}/invert_visibility/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: INVERT_COURSE_VISIBILITY,
        payload: id
      });
    })
    .catch((err) => console.log(err));
};
