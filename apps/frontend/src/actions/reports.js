import axios from "axios";
import {
    CREATE_REPORT,
    GET_REPORT_BY_DAY_ID,
    GET_REPORT_QUESTIONS,
    GET_REPORTS
} from "./types";
import {tokenConfig} from "./auth";
import {createMessage} from "./messages";

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
export const createReport = (report_answers, data, callback_func) => (dispatch, getstate) => {
    axios
        .post("/api/reports/", data, tokenConfig(getstate))
        .then(res => {
            report_answers.forEach((report_answer, index) => {
                const formData = new FormData();
                formData.append("question_id", report_answer.report_question_id)
                formData.append("answer_text", report_answer.text)
                formData.append("report_id", res.data.id)
                createReportItem(formData, (index === report_answers.length - 1) ? callback_func : () => {})
            });
            dispatch(createMessage({sendReport: "Отчёт отправлен"}));
            dispatch({
                type: CREATE_REPORT,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// CREATE_REPORT_ITEM
export const createReportItem = (data, callback_func) => {
    axios
        .post("/api/report_items/", data, {})
        .then(res => {
            callback_func()
        })
        .catch((err) => console.log(err))
};

// GET_REPORTS
export const getReports = () => (dispatch) => {
    axios
        .get("/api/reports/", {})
        .then(res => {
            dispatch({
                type: GET_REPORTS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// GET_REPORT_BY_DAY_ID
export const getReportByDayId = (day_id) => (dispatch, getState) => {
    axios
        .get(`/api/reports/report_by_day_id?day_id=${day_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPORT_BY_DAY_ID,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};