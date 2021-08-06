import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Header";

import { Provider } from "react-redux";
import store from "../store";
import Courses from "./courses/Courses";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Header />
                    <Courses />
                </Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"))