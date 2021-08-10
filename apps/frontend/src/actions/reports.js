import axios from "axios";
import {GET_REPORT_QUESTIONS} from "./types";

// GET_REPORT_QUESTIONS
export const getReportQuestionsByDayId = (course_day_id) => (dispatch) => {
    axios
        .get(`/api/days/${course_day_id}/report_questions_list/`, {
        })
        .then(res => {
            dispatch({
                type: GET_REPORT_QUESTIONS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// UPDATE_REPORT_QUESTION
export const updateReportQuestion = (data) => {
    axios
        .patch(`/api/report_questions/${data.id}/`, data, {})
        .catch((err) => console.log(err));
};

// CREATE_REPORT
export const createReport = (data, callback_func) => {
    axios
        .post(`/api/days/${course_day_id}/report_questions_list/`, data, {
        })
        .catch((err) => console.log(err))
        .then(callback_func())
};