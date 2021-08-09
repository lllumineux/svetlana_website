import {GET_COURSE_WEEK, GET_COURSE_WEEKS, UPDATE_COURSE_WEEK} from "../actions/types";

const initialState = {
  course_weeks: [],
  course_week: {"id": "", "number": "", "short_description": "", "course": ""}
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_COURSE_WEEKS:
      return {
        ...state,
        course_weeks: action.payload,
      };
    case GET_COURSE_WEEK:
      return {
        ...state,
        course_week: action.payload,
      };
    case UPDATE_COURSE_WEEK:
      return {
        ...state,
        course_weeks: [],
        course_week: action.payload
      };
    default:
      return state;
  }
}