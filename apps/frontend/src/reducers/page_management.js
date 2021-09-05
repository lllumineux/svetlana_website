import {
    ADD_NUMBER,
    GET_NUMBERS, HIDE_FOOTER,
    HIDE_HEADER, SHOW_FOOTER,
    SHOW_HEADER
} from "../actions/types";

const initialState = {
  isHeaderShown: false,
  isFooterShown: false
};

export default function (state= initialState, action) {
  switch (action.type) {
    case SHOW_HEADER:
      return {
        ...state,
        isHeaderShown: true,
      };
    case HIDE_HEADER:
      return {
        ...state,
        isHeaderShown: false,
      };
        case SHOW_FOOTER:
      return {
        ...state,
        isFooterShown: true,
      };
    case HIDE_FOOTER:
      return {
        ...state,
        isFooterShown: false,
      };
    default:
      return state;
  }
}