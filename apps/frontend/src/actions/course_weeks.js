import axios from "axios";
import {GET_COURSE_WEEKS} from "./types";


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
