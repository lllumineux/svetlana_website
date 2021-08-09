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
import EditCourseWeek from "./edit_course_week_page/EditCourseWeek";
import CourseWeek from "./course_week_page/CourseWeek";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Fragment>
                        <Header />
                        <div className="content">
                            <Switch>
                                <Route exact path="/courses/" component={Courses}/>
                                <Route exact path="/courses/add/" component={AddCourse}/>
                                <Route exact path="/courses/:pk/" component={CourseWeeks}/>
                                <Route exact path="/courses/edit/:pk/" component={EditCourse}/>
                                <Route exact path="/courses/:pk/weeks/:num/" component={(props) => <CourseWeek {...props}/>} />
                                <Route exact path="/courses/:pk/weeks/edit/:num/" component={(props) => <EditCourseWeek {...props}/>} />
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