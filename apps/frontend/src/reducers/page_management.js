import {
  HIDE_FOOTER,
  HIDE_HEADER, HIDE_LOADER, SHOW_FOOTER,
  SHOW_HEADER, SHOW_LOADER
} from "../actions/types";

const initialState = {
  isHeaderShown: false,
  isFooterShown: false,
  isLoading: true
};

export default function (state= initialState, action) {
  switch (action.type) {
    case SHOW_HEADER:
      return {
        ...state,
        isHeaderShown: action.payload,
      };
    case HIDE_HEADER:
      return {
        ...state,
        isHeaderShown: action.payload,
      };
    case SHOW_FOOTER:
      return {
        ...state,
        isFooterShown: action.payload,
      };
    case HIDE_FOOTER:
      return {
        ...state,
        isFooterShown: action.payload,
      };
    case SHOW_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    case HIDE_LOADER:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}