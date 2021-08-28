import React, { Component, Fragment } from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "../../actions/auth";

export class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
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
                            <Link to="/signup/" className="hover-animation">Зарегистрироваться</Link>
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

export default connect(mapStateToProps, { login })(Login)