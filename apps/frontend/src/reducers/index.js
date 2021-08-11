import { combineReducers } from "redux";
import courses from "./courses";
import general_info from "./general_info"
import course_weeks from "./course_weeks";
import course_days from "./course_days";
import reports from "./reports";
import numbers from "./numbers";
import screenshots from "./screenshots";

export default combineReducers({
    courses,
    general_info,
    course_weeks,
    course_days,
    reports,
    numbers,
    screenshots
});