import axios from "axios";
import {GET_REPORT_QUESTIONS} from "./types";
import {tokenConfig} from "./auth";

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
export const createReport = (report_answers, callback_func) => (dispatch, getstate) => {
    axios
        .post("/api/reports/", {}, tokenConfig(getstate))
        .then(res => {
            report_answers.forEach(report_answer => {
                const formData = new FormData();
                formData.append("question_id", report_answer.report_question_id)
                formData.append("answer_text", report_answer.text)
                formData.append("report_id", res.data.id)
                createReportItem(formData)
            })
        })
        .catch((err) => console.log(err))
};

// CREATE_REPORT_ITEM
export const createReportItem = (data) => {
    axios
        .post("/api/report_items/", data, {})
        .catch((err) => console.log(err))
};
