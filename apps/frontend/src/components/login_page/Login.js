import React, { Component, Fragment } from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "../../actions/auth";
import {hideLoader, hideFooter, hideHeader} from "../../actions/page_management";

export class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        (document.readyState === "complete") ? this.props.hideLoader() : window.addEventListener('load', this.props.hideLoader);
        this.props.hideHeader();
        this.props.hideFooter();
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        this.props.login(
            this.state.username,
            this.state.password,
            () => {
                this.props.history.push({
                    pathname: "/courses/",
                    state: this.props.location.state && this.props.location.state.isPopupShown ? {
                        isPopupShown: this.props.location.state.isPopupShown,
                        popupParagraphsInfo: this.props.location.state.popupParagraphsInfo
                    } : {}
                });
            }
        );
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.onSubmit} className="auth-forms">
                    <h2 className="auth-forms-header">Вход</h2>
                    <div className="auth-forms-content">
                        <input type="text" name="username" placeholder="Ник" onChange={this.onChange}/>
                        <input type="password" name="password" placeholder="Пароль" onChange={this.onChange}/>
                    </div>
                    <div className="auth-forms-controls">
                        <button type="submit" className="hover-animation">Войти</button>
                        <div className="second-btn-wrapper">
                            <Link to={{
                                pathname: "/signup/",
                                state: this.props.location.state && this.props.location.state.isPopupShown ? {
                                    isPopupShown: this.props.location.state.isPopupShown,
                                    popupParagraphsInfo: this.props.location.state.popupParagraphsInfo
                                } : {}
                            }} className="hover-animation">Зарегистрироваться</Link>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    };
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { hideLoader, hideHeader, hideFooter, login })(Login)