import {CREATE_REPORT, GET_REPORT_QUESTIONS} from "../actions/types";

const initialState = {
  report_questions: []
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
        ...state
      };
    default:
      return state;
  }
}