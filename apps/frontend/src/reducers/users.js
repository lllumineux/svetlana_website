import {GET_USERS, INVERT_USER_COURSE_ACCESS} from "../actions/types";

const initialState = {
  users: []
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case INVERT_USER_COURSE_ACCESS:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.id) user = action.payload
          return user;
        }),
      };
    default:
      return state;
  }
}