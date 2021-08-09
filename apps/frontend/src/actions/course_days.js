// GET_COURSE_DAYS
import axios from "axios";
import {GET_COURSE_DAYS} from "./types";

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