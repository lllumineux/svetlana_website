import {GET_COURSE_DAYS} from "../actions/types";

const initialState = {
  course_days: []
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_COURSE_DAYS:
      return {
        ...state,
        course_days: action.payload,
      };
    default:
      return state;
  }
}