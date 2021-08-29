import axios from "axios";
import {GET_USERS, INVERT_USER_COURSE_ACCESS} from "./types";
import {createMessage} from "./messages";
import {tokenConfig} from "./auth";

// GET_USERS
export const getUsers = () => (dispatch, getState) => {
    axios
        .get("/api/users/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// INVERT_USER_COURSE_ACCESS
export const invertUserCourseAccess = (user_id, course_id) => (dispatch, getState) => {
    axios
        .post("/api/users_courses/invert_access/", { user_id, course_id }, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({invertUserCourseAccess: "Изменения сохранены"}));
            dispatch({
                type: INVERT_USER_COURSE_ACCESS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};