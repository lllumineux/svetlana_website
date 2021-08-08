import axios from "axios";
import {GET_CONTACT_INFO} from "./types";

// GET_CONTACT_INFO
export const getContactInfo = () => (dispatch) => {
  axios
    .get("/api/general_info/contact_info/", {
    })
    .then(res => {
      dispatch({
        type: GET_CONTACT_INFO,
        payload: res.data
      });
    })
    .catch((err) => console.log(err))
};