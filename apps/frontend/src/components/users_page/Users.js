import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getUsers, invertUserCourseAccess} from "../../actions/users";
import {getCourses} from "../../actions/courses";
import {hideLoader, showFooter, showHeader} from "../../actions/page_management";

export class Users extends Component {
    state = {
        searchTerms: "",
    };

    static propTypes = {
        users: PropTypes.array.isRequired,
        getUsers: PropTypes.func.isRequired,
        getCourses: PropTypes.func.isRequired,
        invertUserCourseAccess: PropTypes.func.isRequired
    };

    componentDidMount() {
        (document.readyState === "complete") ? this.props.hideLoader() : window.addEventListener('load', this.props.hideLoader);
        this.props.showHeader();
        this.props.showFooter();
        this.props.getUsers();
        this.props.getCourses();
    }

    onSearchChange = e => this.setState({ searchTerms: e.target.value })

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Пользователи</h2></div>
                <input type="text" name="username-search-form" className="username-search-form" placeholder="Поиск по нику" onChange={this.onSearchChange}/>
                <div className="user-cards">
                    {this.props.users.filter(user => {
                        if (this.state.searchTerms === "") return user;
                        if (user.username.toLowerCase().includes(this.state.searchTerms.toLowerCase())) return user;
                    }).map(user => {
                        const userCourseNames = user.courses.map(course => course.name);
                        return (
                            <div className="user-card" key={user.username}>
                                <h3>{user.username}</h3>
                                <div className="user-card-courses">
                                    {this.props.courses.map(course => (
                                        <div className="user-card-course" key={user.id + course.id}>
                                            {userCourseNames.includes(course.name) || user.is_staff ? (
                                                <img
                                                    className="checkbox"
                                                    src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMTgyNTQgOS45NTUxMkM2Ljk3MjQ4IDEwLjI0MDIgNi42NDUzNyAxMC40MTU0IDYuMjkxNjkgMTAuNDMyOUM1LjkzODAxIDEwLjQ1MDQgNS41OTU0NiAxMC4zMDc5IDUuMzU4NDggMTAuMDQ0N0wzLjIzNDc4IDcuNjg3OTdDMi44OTcyNiA3LjMxMzY0IDIuOTI3MjQgNi43MzY2MiAzLjMwMTU3IDYuMzk5MUMzLjY3NjI1IDYuMDYxNTggNC4yNTI5MiA2LjA5MTc0IDQuNTkwNDQgNi40NjYyNUw2LjA5Mjk1IDguMTMzNzVDNi4xMTUyMSA4LjE1ODUzIDYuMTQ3NTMgOC4xNzE4MSA2LjE4MDc0IDguMTcwMkM2LjIxNDE0IDguMTY4NTggNi4yNDQ2NiA4LjE1MTg4IDYuMjY0NTkgOC4xMjUzMUw5LjM1MjkyIDMuOTM2NjJDOS42NTE4NCAzLjUzMDg4IDEwLjIyMzEgMy40NDQ1MiAxMC42MjkgMy43NDM2M0MxMS4wMzQ2IDQuMDQyNzMgMTEuMTIwOCA0LjYxNCAxMC44MjE3IDUuMDE5NTdMNy4xODI1NCA5Ljk1NTEyWiIgZmlsbD0iIzg4ODg4OCIvPgo8cmVjdCB4PSIxIiB5PSIxIiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHJ4PSIyIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K"
                                                    alt="Checked"
                                                    onClick={() => this.props.invertUserCourseAccess(user.id, course.id)}
                                                    style={{cursor : (user.is_staff) ? "default" : "pointer"}}
                                                />
                                            ) : (
                                                <img
                                                    className="checkbox"
                                                    src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMSIgeT0iMSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgc3Ryb2tlPSIjODg4ODg4IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="
                                                    alt="Unchecked"
                                                    onClick={() => this.props.invertUserCourseAccess(user.id, course.id)}
                                                />
                                            )}
                                            <h4>{course.name}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    users: state.users.users,
    courses: state.courses.courses
});

export default connect(mapStateToProps, { hideLoader, showHeader, showFooter, getUsers, getCourses, invertUserCourseAccess })(Users);