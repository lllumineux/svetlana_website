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
                                <Route path="/courses/edit/:id/" component={EditCourse}/>
                                <Route path="/courses/:id/" component={CourseWeeks}/>
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