import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <Fragment>
                {this.props.settings.noHeaderPathNames.filter(pathNameRegEx => pathNameRegEx.test(location.pathname)).length === 0 ? (
                    <header className="header">
                        <div className="admin-nav">
                            {this.props.auth.isAuthenticated ? (
                                <Fragment>
                                    <Link to="/courses/" onClick={() => window.location.replace("/courses/")} className="hover-animation">Курсы</Link>
                                    <Link to="/articles/" onClick={() => window.location.replace("/articles/")} className="hover-animation">Статьи</Link>
                                    {this.props.auth.user.is_staff ? (
                                        <Fragment>
                                            <Link to="/users/" onClick={() => window.location.replace("/users/")} className="hover-animation">Пользователи</Link>
                                            <Link to="/reports/" onClick={() => window.location.replace("/reports/")} className="hover-animation">Отчёты</Link>
                                            <Link to="/numbers/" onClick={() => window.location.replace("/numbers/")} className="hover-animation">Номера</Link>
                                            <Link to="/general_info/" onClick={() => window.location.replace("/general_info/")} className="hover-animation">Редактирование общей информации</Link>
                                        </Fragment>
                                    ) : (
                                        <Link to="/psychological_consultation_description/" onClick={() => window.location.replace("/psychological_consultation_description/")} className="hover-animation">Психологическая консультация</Link>
                                    )}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Link to="/" onClick={() => window.location.replace("/")} className="hover-animation">Главная</Link>
                                    <Link to="/psychological_consultation_description/" onClick={() => window.location.replace("/psychological_consultation_description/")} className="hover-animation">Психологическая консультация</Link>
                                    <Link to="/articles/" onClick={() => window.location.replace("/articles/")} className="hover-animation">Статьи</Link>
                                </Fragment>
                            )}
                        </div>
                        <div className="profile-nav">
                            {this.props.auth.isAuthenticated ? (
                                <Fragment>
                                    <div className="user-nickname">{this.props.auth.user.username}</div>
                                    <button className="logout hover-animation" onClick={this.props.logout}>Выйти</button>
                                </Fragment>
                            ) : (
                                <Link to="/login/" onClick={() => window.location.replace("/login/")} className="login hover-animation">Войти</Link>
                            )}
                        </div>
                    </header>
                ) : ""}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header)
