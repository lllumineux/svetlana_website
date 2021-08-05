import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Header";

import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <div>this is header: </div>
                    <Header/>
                </Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"))