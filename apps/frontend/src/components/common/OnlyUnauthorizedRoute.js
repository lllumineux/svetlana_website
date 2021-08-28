import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const OnlyUnauthorizedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if(auth.isLoading) {
                return ""
            } else if(!auth.isAuthenticated) {
                return <Component {...props} />;
            } else {
                return <Redirect push to="/courses/"/>
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(OnlyUnauthorizedRoute);
