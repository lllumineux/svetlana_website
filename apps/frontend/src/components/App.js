import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter, Switch, Route, withRouter} from "react-router-dom";
import store from "../store";
import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from "./common/AlertTemplate";
import {loadUser} from "../actions/auth";

import OnlyAuthorizedRoute from "./common/OnlyAuthorizedRoute";
import OnlyAdminRoute from "./common/OnlyAdminRoute"
import OnlyUnauthorizedRoute from "./common/OnlyUnauthorizedRoute"

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Alerts from "./layout/Alerts"

import Main from "./main_page/Main"
import CourseDescription from "./course_description_page/CourseDescription";
import PsychologicalConsultationDescription from "./pscychological_consultation_description_page/PsychologicalConsultationDescription";

import Login from "./login_page/Login";
import Signup from "./signup_page/Signup";

import Courses from "./courses_page/Courses";
import AddCourse from "./add_course_page/AddCourse";
import EditCourse from "./edit_course_page/EditCourse";
import CourseWeeks from "./course_weeks_page/CourseWeeks";
import CourseDays from "./course_days_page/CourseDays";
import EditCourseWeek from "./edit_course_week_page/EditCourseWeek";
import EditCourseDay from "./edit_course_day_page/EditCourseDay";
import CourseDay from "./course_day_page/CourseDay";

import Numbers from "./numbers_page/Numbers";

import Users from "./users_page/Users";

import Reports from "./reports_page/Reports";

import EditGeneralInfo from "./edit_general_info_page/EditGeneralInfo";

import Articles from "./articles_page/Articles";
import EditArticle from "./edit_article_page/EditArticle";
import AddArticle from "./add_article_page/AddArticle";
import Article from "./article_page/Article";
import SpinningLoader from "./layout/Loader";

const alertOptions = {
    timeout: 3000,
    position: "top center"
}

 const headerSettings = {
    noHeaderPathNames: [
        new RegExp(/^(\/)$/),
        new RegExp(/^(\/login\/)$/),
        new RegExp(/^(\/signup\/)$/),
    ],
};

 const footerSettings = {
     noFooterPathNames: [
        new RegExp(/^(\/login\/)$/),
        new RegExp(/^(\/signup\/)$/)
    ]
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <BrowserRouter>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Provider store={store}>
                        <Fragment>
                            {(location.pathname === "/") ? <style>{"body {background: #000;} #app .content {width: 100%!important; padding: 0!important;}"}</style> : ""}
                            <SpinningLoader />
                            <Header settings={headerSettings}/>
                            <Alerts />
                            <div className="content">
                                <Switch>
                                    {/* Unauthorized user pages */}
                                    <OnlyUnauthorizedRoute exact path="/" component={Main} />
                                    <OnlyUnauthorizedRoute exact path="/course_description/:pk/" component={CourseDescription} />
                                    <Route exact path="/psychological_consultation_description/" component={PsychologicalConsultationDescription} />

                                    {/* Login/Signup */}
                                    <OnlyUnauthorizedRoute exact path="/login/" component={Login} />
                                    <OnlyUnauthorizedRoute exact path="/signup/" component={Signup} />

                                    {/* Courses */}
                                    <OnlyAuthorizedRoute exact path="/courses/" component={Courses} />
                                    <OnlyAdminRoute exact path="/courses/add/" component={AddCourse} />
                                    <OnlyAuthorizedRoute exact path="/courses/:pk/" component={CourseWeeks} />
                                    <OnlyAdminRoute exact path="/courses/edit/:pk/" component={EditCourse} />
                                    <OnlyAuthorizedRoute exact path="/courses/:pk/weeks/:num/" component={(props) => <CourseDays {...props}/>} />
                                    <OnlyAdminRoute exact path="/courses/:pk/weeks/edit/:num/" component={(props) => <EditCourseWeek {...props}/>} />
                                    <OnlyAuthorizedRoute exact path="/courses/:pk/weeks/:num1/days/:num2/" component={(props) => <CourseDay {...props}/>} />
                                    <OnlyAdminRoute exact path="/courses/:pk/weeks/:num1/days/edit/:num2/" component={(props) => <EditCourseDay {...props}/>} />

                                    {/* Articles */}
                                    <Route exact path="/articles/" component={Articles} />
                                    <OnlyAdminRoute exact path="/articles/add/" component={AddArticle} />
                                    <Route exact path="/articles/:pk/" component={Article} />
                                    <OnlyAdminRoute exact path="/articles/edit/:pk/" component={EditArticle} />

                                    {/* General Info */}
                                    <OnlyAdminRoute exact path="/general_info/" component={EditGeneralInfo} />

                                    {/* Numbers */}
                                    <OnlyAdminRoute exact path="/numbers/" component={Numbers} />

                                    {/* Users */}
                                    <OnlyAdminRoute exact path="/users/" component={Users} />

                                    {/* Reports */}
                                    <OnlyAdminRoute exact path="/reports/" component={Reports} />
                                </Switch>
                            </div>
                            <Footer settings={footerSettings} />
                        </Fragment>
                    </Provider>
                </AlertProvider>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"))
