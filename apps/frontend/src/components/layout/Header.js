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
                {this.props.settings.noHeaderPathNames.filter(pathNameRegEx => pathNameRegEx.test(location.pathname)).length === 0 && this.props.auth.isAuthenticated ? (
                    <header className="header">
                        {this.props.auth.user.is_staff ? (
                            <div className="admin-nav">
                                <Link to="/courses/" onClick={() => window.location.replace("/courses/")} className="hover-animation">Курсы</Link>
                                <Link to="/users/" onClick={() => window.location.replace("/users/")} className="hover-animation">Пользователи</Link>
                                <Link to="/reports/" onClick={() => window.location.replace("/reports/")} className="hover-animation">Отчёты</Link>
                                <Link to="/articles/" onClick={() => window.location.replace("/articles/")} className="hover-animation">Статьи</Link>
                                <Link to="/general_info/" onClick={() => window.location.replace("/general_info/")} className="hover-animation">Редактирование общей информации</Link>
                                <Link to="/numbers/" onClick={() => window.location.replace("/numbers/")} className="hover-animation">Номера</Link>
                            </div>
                        ) : <div/>}
                        <div className="profile-nav">
                            <div className="user-nickname">{this.props.auth.user.username}</div>
                            <button className="logout hover-animation" onClick={this.props.logout}>Выйти</button>
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
