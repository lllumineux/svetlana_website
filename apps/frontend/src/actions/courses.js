import axios from "axios";
import { GET_COURSES, DELETE_COURSE, INVERT_COURSE_VISIBILITY } from "./types";


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