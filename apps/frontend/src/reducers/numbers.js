import {ADD_NUMBER, GET_NUMBERS} from "../actions/types";

const initialState = {
  numbers: []
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_NUMBERS:
      return {
        ...state,
        numbers: action.payload,
      };
    case ADD_NUMBER:
      return {
        ...state,
        numbers: state.numbers.concat(action.payload),
      };
    default:
      return state;
  }
}