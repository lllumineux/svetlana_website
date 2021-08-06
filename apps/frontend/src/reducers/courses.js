import { GET_COURSES, DELETE_COURSE, INVERT_COURSE_VISIBILITY } from "../actions/types";

const initialState = {
  courses: []
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.payload)
      };
    case INVERT_COURSE_VISIBILITY:
      return {
        ...state,
        courses: state.courses.map(course => {
          course.is_hidden = (course.id === action.payload) ? !course.is_hidden : course.is_hidden;
          return course;
        })
      };
    default:
      return state;
  }
}