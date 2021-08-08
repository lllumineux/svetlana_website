import {GET_COURSE_WEEKS} from "../actions/types";

const initialState = {
  course_weeks: []
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_COURSE_WEEKS:
      return {
        ...state,
        course_weeks: action.payload,
      };
    default:
      return state;
  }
}