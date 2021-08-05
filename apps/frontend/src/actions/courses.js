import axios from "axios";
import { GET_COURSES } from "./types";

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