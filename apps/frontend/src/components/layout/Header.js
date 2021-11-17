import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";
import {showLoader} from "../../actions/page_management";

export class Header extends Component {
    state = {
        isMenuShown: false
    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        isHeaderShown: PropTypes.bool.isRequired
    }

    showMenu = () => this.setState({isMenuShown: true})
    hideMenu = () => this.setState({isMenuShown: false})

    render() {
        return (
            <Fragment>
                {this.state.isMenuShown ? (
                    <div className="menu-wrapper">
                        <img className="menu-close-btn hover-animation" onClick={this.hideMenu} src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0xMS44MzIzIDEwLjAxNjRMMTkuNjIgMi4yMjg1NkMyMC4xMjY4IDEuNzIxOTkgMjAuMTI2OCAwLjkwMjk0MSAxOS42MiAwLjM5NjM3NEMxOS4xMTM0IC0wLjExMDE5MyAxOC4yOTQzIC0wLjExMDE5MyAxNy43ODc4IDAuMzk2Mzc0TDkuOTk5OTEgOC4xODQyMUwyLjIxMjI5IDAuMzk2Mzc0QzEuNzA1NDkgLTAuMTEwMTkzIDAuODg2NjcyIC0wLjExMDE5MyAwLjM4MDEwNCAwLjM5NjM3NEMtMC4xMjY3MDEgMC45MDI5NDEgLTAuMTI2NzAxIDEuNzIxOTkgMC4zODAxMDQgMi4yMjg1Nkw4LjE2NzczIDEwLjAxNjRMMC4zODAxMDQgMTcuODA0MkMtMC4xMjY3MDEgMTguMzEwOCAtMC4xMjY3MDEgMTkuMTI5OSAwLjM4MDEwNCAxOS42MzY0QzAuNjMyNTU4IDE5Ljg4OTEgMC45NjQ0OTYgMjAuMDE2IDEuMjk2MiAyMC4wMTZDMS42Mjc5IDIwLjAxNiAxLjk1OTYgMTkuODg5MSAyLjIxMjI5IDE5LjYzNjRMOS45OTk5MSAxMS44NDg2TDE3Ljc4NzggMTkuNjM2NEMxOC4wNDA1IDE5Ljg4OTEgMTguMzcyMiAyMC4wMTYgMTguNzAzOSAyMC4wMTZDMTkuMDM1NiAyMC4wMTYgMTkuMzY3MyAxOS44ODkxIDE5LjYyIDE5LjYzNjRDMjAuMTI2OCAxOS4xMjk5IDIwLjEyNjggMTguMzEwOCAxOS42MiAxNy44MDQyTDExLjgzMjMgMTAuMDE2NFoiIGZpbGw9IiM4ODg4ODgiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="Close Popup Button" />
                        <div className="menu-content">
                            <div className="menu-user-nav">
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
                        </div>
                    </div>
                ): ""}
                {this.props.isHeaderShown ? (
                    <header className="header">
                        <button className="header-menu-btn" onClick={this.showMenu}>
                            <img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnanM9Imh0dHA6Ly9zdmdqcy5jb20vc3ZnanMiIHZlcnNpb249IjEuMSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAzODQgMzg0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5OTk5OTk5OTk5OTk5OTksMCwwLDEsLTIuODQyMTcwOTQzMDQwNDAxZS0xNCw1NS4wMDAwMDAwMDAwMDAwMykiPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTM2OCAxNTQuNjY3OTY5aC0zNTJjLTguODMyMDMxIDAtMTYtNy4xNjc5NjktMTYtMTZzNy4xNjc5NjktMTYgMTYtMTZoMzUyYzguODMyMDMxIDAgMTYgNy4xNjc5NjkgMTYgMTZzLTcuMTY3OTY5IDE2LTE2IDE2em0wIDAiIGZpbGw9IiM4ODg4ODgiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiLz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0zNjggMzJoLTM1MmMtOC44MzIwMzEgMC0xNi03LjE2Nzk2OS0xNi0xNnM3LjE2Nzk2OS0xNiAxNi0xNmgzNTJjOC44MzIwMzEgMCAxNiA3LjE2Nzk2OSAxNiAxNnMtNy4xNjc5NjkgMTYtMTYgMTZ6bTAgMCIgZmlsbD0iIzg4ODg4OCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiIvPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTM2OCAyNzcuMzMyMDMxaC0zNTJjLTguODMyMDMxIDAtMTYtNy4xNjc5NjktMTYtMTZzNy4xNjc5NjktMTYgMTYtMTZoMzUyYzguODMyMDMxIDAgMTYgNy4xNjc5NjkgMTYgMTZzLTcuMTY3OTY5IDE2LTE2IDE2em0wIDAiIGZpbGw9IiM4ODg4ODgiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiLz48L2c+PC9zdmc+Cg==" alt="Menu Icon"/>
                        </button>
                        <div className="user-nav">
                            {this.props.auth.isAuthenticated ? (
                                <Fragment>
                                    <Link to="/courses/" onClick={() => {
                                        this.props.showLoader();
                                        window.location.replace("/courses/");
                                    }} className="hover-animation">Курсы</Link>
                                    <Link to="/articles/" onClick={() => {
                                        this.props.showLoader();
                                        window.location.replace("/articles/");
                                    }} className="hover-animation">Статьи</Link>
                                    {this.props.auth.user.is_staff ? (
                                        <Fragment>
                                            <Link to="/users/" onClick={() => {
                                                this.props.showLoader();
                                                window.location.replace("/users/");
                                            }} className="hover-animation">Пользователи</Link>
                                            <Link to="/reports/" onClick={() => {
                                                this.props.showLoader();
                                                window.location.replace("/reports/");
                                            }} className="hover-animation">Отчёты</Link>
                                            <Link to="/numbers/" onClick={() => {
                                                this.props.showLoader();
                                                window.location.replace("/numbers/");
                                            }} className="hover-animation">Номера</Link>
                                            <Link to="/general_info/" onClick={() => {
                                                this.props.showLoader();
                                                window.location.replace("/general_info/");
                                            }} className="hover-animation">Редактирование общей информации</Link>
                                        </Fragment>
                                    ) : (
                                        <Link to="/psychological_consultation_description/" onClick={() => {
                                            this.props.showLoader();
                                            window.location.replace("/psychological_consultation_description/");
                                        }} className="hover-animation">Психологическая консультация</Link>
                                    )}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Link to="/" onClick={() => {
                                        this.props.showLoader();
                                        window.location.replace("/");
                                    }} className="hover-animation">Главная</Link>
                                    <Link to="/psychological_consultation_description/" onClick={() => {
                                        this.props.showLoader();
                                        window.location.replace("/psychological_consultation_description/");
                                    }} className="hover-animation">Психологическая консультация</Link>
                                    <Link to="/articles/" onClick={() => {
                                        this.props.showLoader();
                                        window.location.replace("/articles/");
                                    }} className="hover-animation">Статьи</Link>
                                </Fragment>
                            )}
                        </div>
                        <div className="profile-nav">
                            {this.props.auth.isAuthenticated ? (
                                <Fragment>
                                    <div className="user-nickname">{this.props.auth.user.username}</div>
                                    <button className="logout hover-animation" onClick={() => {
                                        this.props.showLoader();
                                        this.props.logout();
                                        window.location.replace("/login/");
                                    }}>Выйти</button>
                                </Fragment>
                            ) : (
                                <Link to="/login/" onClick={() => {
                                    this.props.showLoader();
                                    window.location.replace("/login/");
                                }} className="login hover-animation">Войти</Link>
                            )}
                        </div>
                    </header>
                ) : ""}
                {this.state.isMenuShown ? <style>{"html {overflow: hidden;}"}</style> : ""}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    isHeaderShown: state.page_management.isHeaderShown
});

export default connect(mapStateToProps, { logout, showLoader })(Header)
