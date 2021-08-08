import axios from "axios";
import {GET_COURSES, DELETE_COURSE, INVERT_COURSE_VISIBILITY, ADD_COURSE, GET_COURSE, UPDATE_COURSE} from "./types";


// GET COURSES
export const getCourses = () => (dispatch) => {
  axios
    .get("/api/courses/")
    .then(res => {
      dispatch({
        type: GET_COURSES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET COURSE
export const getCourse = (id) => (dispatch) => {
  axios
    .get(`/api/courses/${id}/`)
    .then(res => {
      dispatch({
        type: GET_COURSE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// ADD_COURSE
export const addCourse = (course, callback_func) => (dispatch) => {
  axios
    .post(`/api/courses/`, course, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then(res => {
      dispatch({
        type: ADD_COURSE,
        payload: res.data
      });
    })
    .catch((err) => console.log(err))
    .then(callback_func());
};

// DELETE COURSE
export const deleteCourse = (id) => (dispatch) => {
  axios
    .delete(`/api/courses/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_COURSE,
        payload: id
      });
    })
    .catch((err) => console.log(err));
};

// UPDATE_COURSE
export const updateCourse = (id, course, callback_func) => (dispatch) => {
  axios
    .patch(`/api/courses/${id}/`, course, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then(res => {
      dispatch({
        type: UPDATE_COURSE,
        payload: res.data
      });
    })
    .catch((err) => console.log(err))
    .then(callback_func());
};

// INVERT_COURSE_VISIBILITY
export const invertCourseVisibility = (id) => (dispatch) => {
  axios
    .patch(`/api/courses/${id}/invert_visibility/`)
    .then(res => {
      dispatch({
        type: INVERT_COURSE_VISIBILITY,
        payload: id
      });
    })
    .catch((err) => console.log(err));
};
