import {GET_COURSE_DAY, GET_COURSE_DAYS, UPDATE_COURSE_DAY} from "../actions/types";

const initialState = {
  course_days: [],
  course_day: {"id": "", "number": "", "name": "", "short_description": "", "content": "", "week": ""}
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_COURSE_DAYS:
      return {
        ...state,
        course_days: action.payload,
      };
    case GET_COURSE_DAY:
      return {
        ...state,
        course_day: action.payload,
      };
    case UPDATE_COURSE_DAY:
      return {
        ...state,
        course_day: action.payload,
      };
    default:
      return state;
  }
}