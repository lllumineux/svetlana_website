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

// CREATE_REPORT
export const createReport = (data) => (dispatch, getstate) => {
    axios
        .post("/api/reports/", data, tokenConfig(getstate))
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