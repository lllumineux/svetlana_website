import {
  CREATE_REPORT, GET_REPORT_BY_DAY_ID,
  GET_REPORT_QUESTIONS,
  GET_REPORTS
} from "../actions/types";

const initialState = {
  report_questions: [],
  reports: [],
  report: {}
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_REPORT_QUESTIONS:
      return {
        ...state,
        report_questions: action.payload,
      };
    case CREATE_REPORT:
      return {
        ...state,
        report: action.payload
      };
    case GET_REPORTS:
      return {
        ...state,
        reports: action.payload,
      };
    case GET_REPORT_BY_DAY_ID:
      return {
        ...state,
        report: action.payload,
      };
    default:
      return state;
  }
}