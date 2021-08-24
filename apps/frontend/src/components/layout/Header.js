import React, { Component } from "react";
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
            <header className="header">
                <div className="admin-nav">
                    <Link to="/courses/" onClick={() => window.location.replace("/courses/")} className="hover-animation">Курсы</Link>
                    <Link to="/users/" onClick={() => window.location.replace("/users/")} className="hover-animation">Пользователи</Link>
                    <Link to="/reports/" onClick={() => window.location.replace("/reports/")} className="hover-animation">Отчёты</Link>
                    <Link to="/articles/" onClick={() => window.location.replace("/articles/")} className="hover-animation">Статьи</Link>
                    <Link to="/general_info/" onClick={() => window.location.replace("/general_info/")} className="hover-animation">Редактирование общей информации</Link>
                    <Link to="/numbers/" onClick={() => window.location.replace("/numbers/")} className="hover-animation">Номера</Link>
                </div>
                <div className="profile-nav">
                    <div className="user-nickname">{this.props.auth.user.username}</div>
                    <button className="logout hover-animation" onClick={this.props.logout}>Выйти</button>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header)
