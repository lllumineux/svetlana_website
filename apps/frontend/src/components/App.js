import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import store from "../store";


import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Courses from "./courses_page/Courses";
import AddCourse from "./add_course_page/AddCourse";
import EditCourse from "./edit_course_page/EditCourse";
import CourseWeeks from "./course_weeks_page/CourseWeeks";
import CourseDays from "./course_days_page/CourseDays";
import EditCourseWeek from "./edit_course_week_page/EditCourseWeek";
import EditCourseDay from "./edit_course_day_page/EditCourseDay";
import CourseDay from "./course_day_page/CourseDay";
import Numbers from "./numbers_page/Numbers";
import EditGeneralInfo from "./edit_general_info_page/EditGeneralInfo";
import Articles from "./articles_page/Articles";
import EditArticle from "./edit_article_page/EditArticle";
import AddArticle from "./add_article_page/AddArticle";
import Article from "./article_page/Article";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Fragment>
                        <Header />
                        <div className="content">
                            <Switch>
                                {/* Courses */}
                                <Route exact path="/courses/" component={Courses} />
                                <Route exact path="/courses/add/" component={AddCourse} />
                                <Route exact path="/courses/:pk/" component={CourseWeeks} />
                                <Route exact path="/courses/edit/:pk/" component={EditCourse} />
                                <Route exact path="/courses/:pk/weeks/:num/" component={(props) => <CourseDays {...props}/>} />
                                <Route exact path="/courses/:pk/weeks/edit/:num/" component={(props) => <EditCourseWeek {...props}/>} />
                                <Route exact path="/courses/:pk/weeks/:num1/days/:num2/" component={(props) => <CourseDay {...props}/>} />
                                <Route exact path="/courses/:pk/weeks/:num1/days/edit/:num2/" component={(props) => <EditCourseDay {...props}/>} />

                                {/* Articles */}
                                <Route exact path="/articles/" component={Articles} />
                                <Route exact path="/articles/add/" component={AddArticle} />
                                <Route exact path="/articles/:pk/" component={Article} />
                                <Route exact path="/articles/edit/:pk/" component={EditArticle} />


                                {/* General Info */}
                                <Route exact path="/general_info/" component={EditGeneralInfo} />

                                {/* Numbers */}
                                <Route exact path="/numbers/" component={Numbers} />
                            </Switch>
                        </div>
                        <Footer />
                    </Fragment>
                </Provider>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"))