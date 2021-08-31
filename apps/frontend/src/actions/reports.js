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
export const getReportQuestionsByDay = (course_id, week_number, day_number) => (dispatch, getState) => {
    axios
        .get(`/api/days/report_questions_list?course_id=${course_id}&week_number=${week_number}&day_number=${day_number}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPORT_QUESTIONS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// CREATE_REPORT
export const createReport = (data) => (dispatch, getState) => {
    axios
        .post("/api/reports/", data, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({sendReport: "Отчёт отправлен"}));
            dispatch({
                type: CREATE_REPORT,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// GET_REPORTS
export const getReports = () => (dispatch, getState) => {
    axios
        .get("/api/reports/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPORTS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// GET_REPORT_BY_DAY_ID
export const getReportByDay = (course_id, week_number, day_number) => (dispatch, getState) => {
    axios
        .get(`/api/reports/report_by_day?course_id=${course_id}&week_number=${week_number}&day_number=${day_number}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPORT_BY_DAY_ID,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};