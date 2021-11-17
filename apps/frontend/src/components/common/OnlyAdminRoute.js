import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const OnlyAdminRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if(auth.isLoading) {
                return ""
            } else if(!(auth.isAuthenticated && auth.user.is_staff)) {
                return <Redirect push to="/courses/"/>
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(OnlyAdminRoute);
