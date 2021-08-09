import {GET_COURSE_WEEK, GET_COURSE_WEEKS, UPDATE_COURSE_WEEK} from "../actions/types";

const initialState = {
  course_weeks: [],
  course_week: {"number": "", "short_description": ""}
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
        course_week: state.course_weeks.filter(course_week => course_week.id === action.payload.id)[0] = action.payload
      };
    default:
      return state;
  }
}