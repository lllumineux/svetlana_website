import axios from "axios";
import {GET_USERS, INVERT_USER_COURSE_ACCESS} from "./types";

// GET_USERS
export const getUsers = () => (dispatch) => {
    axios
        .get("/api/users/", {
        })
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// INVERT_USER_COURSE_ACCESS
export const invertUserCourseAccess = (user_id, course_id) => (dispatch) => {
    axios
        .post("/api/users_courses/invert_access/", { user_id, course_id }, {
        })
        .then(res => {
            dispatch({
                type: INVERT_USER_COURSE_ACCESS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};