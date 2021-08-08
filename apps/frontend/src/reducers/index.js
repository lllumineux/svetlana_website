import { combineReducers } from "redux";
import courses from "./courses";
import general_info from "./general_info"

export default combineReducers({
    courses,
    general_info
});