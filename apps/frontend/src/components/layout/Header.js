import React, { Component } from "react";
import {Link} from "react-router-dom";

export class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="admin-nav">
                    <Link to="/courses/" className="hover-animation">Курсы</Link>
                    <Link to="/users/" className="hover-animation">Пользователи</Link>
                    <Link to="/reports/" className="hover-animation">Отчёты</Link>
                    <Link to="/articles/" className="hover-animation">Статьи</Link>
                    <Link to="/general_info/" className="hover-animation">Редактирование общей информации</Link>
                    <Link to="/numbers/" className="hover-animation">Номера</Link>
                </div>
                <div className="profile-nav">
                    <div className="user-nickname">admin</div>
                    <button className="logout hover-animation">Выйти</button>
                </div>
            </header>
        )
    }
}

export default Header
