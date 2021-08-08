import { GET_CONTACT_INFO } from "../actions/types";

const initialState = {
  contact_info: {}
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_CONTACT_INFO:
      return {
        ...state,
        contact_info: action.payload,
      };
    default:
      return state;
  }
}