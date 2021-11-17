import {ADD_SCREENSHOT, DELETE_SCREENSHOT, GET_SCREENSHOTS, UPDATE_SCREENSHOT} from "../actions/types";

const initialState = {
  screenshots: []
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_SCREENSHOTS:
      return {
        ...state,
        screenshots: action.payload,
      };
    case DELETE_SCREENSHOT:
      return {
        ...state,
        screenshots: state.screenshots.filter(screenshot => screenshot.id !== action.payload),
      };
    case ADD_SCREENSHOT:
      return {
        ...state,
        screenshots: [...state.screenshots, action.payload],
      };
    case UPDATE_SCREENSHOT:
      return {
        ...state,
        screenshots: (() => {
          const array = [...state.screenshots.filter(screenshot => screenshot.id !== action.payload.id), action.payload];
          const arrayIds = array.map(obj => obj.id);
          arrayIds.sort((a, b) => a - b)
          const newArray = [];
          arrayIds.forEach(objId => newArray.push(array.find(obj => obj.id === objId)));
          return newArray;
        })(),
      };
    default:
      return state;
  }
}