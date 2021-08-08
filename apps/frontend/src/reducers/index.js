import { combineReducers } from "redux";
import courses from "./courses";
import general_info from "./general_info"
import course_weeks from "./course_weeks";

export default combineReducers({
    courses,
    general_info,
    course_weeks
});