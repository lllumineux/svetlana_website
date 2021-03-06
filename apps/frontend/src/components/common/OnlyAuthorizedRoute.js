import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const OnlyAuthorizedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if(auth.isLoading) {
                return ""
            } else if(!auth.isAuthenticated) {
                return <Redirect push to="/login/"/>
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(OnlyAuthorizedRoute);
