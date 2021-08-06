import React, { Component } from "react";

export class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="admin-nav">
                    <a href="../courses" className="hover-animation">Курсы</a>
                    <a href="../users" className="hover-animation">Пользователи</a>
                    <a href="../reports" className="hover-animation">Отчёты</a>
                    <a href="../articles" className="hover-animation">Статьи</a>
                    <a href="../general_info" className="hover-animation">Редактирование общей информации</a>
                    <a href="../numbers" className="hover-animation">Номера</a>
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
