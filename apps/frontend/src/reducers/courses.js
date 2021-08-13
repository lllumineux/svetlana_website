import {
  GET_COURSES,
  DELETE_COURSE,
  INVERT_COURSE_VISIBILITY,
  ADD_COURSE,
  GET_COURSE,
  UPDATE_COURSE
} from "../actions/types";

const initialState = {
  courses: [],
  course: {"id": "", "name": "", "short_description": "", "full_description": "", "price1": "", "price2": "", "background_img": "", "is_hidden": ""}
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.payload)
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: [...state.courses.filter(course => course.id !== action.payload.id), action.payload]
      };
    case INVERT_COURSE_VISIBILITY:
      return {
        ...state,
        courses: state.courses.map(course => {
          course.is_hidden = (course.id === action.payload) ? !course.is_hidden : course.is_hidden;
          return course;
        })
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload]
      };
    default:
      return state;
  }
}