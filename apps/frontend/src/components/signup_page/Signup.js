import React, { Component, Fragment } from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {signup} from "../../actions/auth";
import {createMessage} from "../../actions/messages";
import {hideFooter, hideHeader} from "../../actions/page_management";

export class Signup extends Component {
    state = {
        username: "",
        password: "",
        password_confirmation: ""
    };

    static propTypes = {
        signup: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.hideHeader();
        this.props.hideFooter();
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        if (this.state.password !== this.state.password_confirmation) {
            this.props.createMessage({ passwordNotMatch: "Пароли не совпадают" });
        }
        else {
            const newUser = {username: this.state.username, password: this.state.password};
            this.props.signup(newUser, () => {
                this.props.history.push({
                    pathname: "/courses/",
                    state: this.props.location.state && this.props.location.state.isPopupShown ? {
                        isPopupShown: this.props.location.state.isPopupShown,
                        popupParagraphsInfo: this.props.location.state.popupParagraphsInfo
                    } : {}
                });
            });
        }
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.onSubmit} className="auth-forms">
                    <h2 className="auth-forms-header">Регистрация</h2>
                    <div className="auth-forms-content">
                        <input type="text" name="username" placeholder="Ник" onChange={this.onChange}/>
                        <input type="password" name="password" placeholder="Пароль" onChange={this.onChange}/>
                        <input type="password" name="password_confirmation" placeholder="Повтор пароля" onChange={this.onChange}/>
                    </div>
                    <div className="auth-forms-controls">
                        <button type="submit" className="hover-animation">Зарегистрироваться</button>
                        <div className="second-btn-wrapper">
                            <Link to={{
                                pathname: "/login/",
                                state: this.props.location.state && this.props.location.state.isPopupShown ? {
                                    isPopupShown: this.props.location.state.isPopupShown,
                                    popupParagraphsInfo: this.props.location.state.popupParagraphsInfo
                                } : {}
                            }} className="hover-animation">Войти</Link>
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

export default connect(mapStateToProps, { hideHeader, hideFooter, signup, createMessage })(Signup)