import { combineReducers } from "redux";
import courses from "./courses";
import general_info from "./general_info"
import course_weeks from "./course_weeks";
import course_days from "./course_days";
import reports from "./reports";
import numbers from "./numbers";
import screenshots from "./screenshots";
import articles from "./articles";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
    courses,
    general_info,
    course_weeks,
    course_days,
    reports,
    numbers,
    screenshots,
    articles,
    errors,
    messages
});