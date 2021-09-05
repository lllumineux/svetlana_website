import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getCourseWeeks} from "../../actions/course_weeks";
import {getCourse} from "../../actions/courses";
import {loadUser} from "../../actions/auth";
import {showFooter, showHeader} from "../../actions/page_management";

export class CourseWeeks extends Component {
    static propTypes = {
        course_weeks: PropTypes.array.isRequired,
        getCourseWeeks: PropTypes.func.isRequired,
        getCourse: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.showHeader();
        this.props.showFooter();
        this.props.getCourseWeeks(this.props.location.pathname.split("/").filter(obj => obj !== "").pop());
        this.props.getCourse(this.props.location.pathname.split("/").filter(obj => obj !== "").pop());
    }

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Курс: {this.props.course.name}</h2></div>
                <div className="weeks">
                    { this.props.course_weeks.map(week => (
                        <div className="week" data-locked={week.is_locked.toString()} key={week.id}>
                            {week.is_locked ? (
                                <Fragment>
                                    <div className="week-locked-warning">
                                        <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2LjU3NzEgOC4yMzM0OUgxNS42Mjk0VjUuMzQ3OTFDMTUuNjI5NCAyLjM5OTM1IDEzLjIzMDYgMCAxMC4yODIyIDBDNy4zMzI3NCAwIDQuOTM0MzYgMi4zOTkwMyA0LjkzNDM2IDUuMzQ3OTFWOC4yMzM0OUgzLjk4N0MzLjQ0MTc2IDguMjMzNDkgMyA4LjY3NTQ3IDMgOS4yMjA1VjE5LjAxMzFDMyAxOS41NTgxIDMuNDQxNzYgMjAgMy45ODcgMjBIMTYuNTc3MkMxNy4xMjEzIDIwIDE3LjU2NDIgMTkuNTU4MSAxNy41NjQyIDE5LjAxMzFWOS4yMjA1QzE3LjU2NDIgOC42NzU0NyAxNy4xMjEyIDguMjMzNDkgMTYuNTc3MSA4LjIzMzQ5Wk02LjkwODE1IDUuMzQ3OTFDNi45MDgxNSAzLjQ4NzE1IDguNDIxNDYgMS45NzM4NCAxMC4yODIyIDEuOTczODRDMTIuMTQyNCAxLjk3Mzg0IDEzLjY1NTggMy40ODcxNSAxMy42NTU4IDUuMzQ3OTFWOC4yMzM0OUg2LjkwODE1VjUuMzQ3OTFaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K" alt="Locked Icon"/>
                                        <p>Для того, чтобы получить доступ к этой недели, сначала пройдите предыдущие!</p>
                                    </div>
                                    <a>
                                        <h3>Неделя {week.number}</h3>
                                        <div className="description">{week.short_description}</div>
                                    </a>
                                </Fragment>
                            ) : (
                                <Link to={{pathname: `/courses/${this.props.course.id}/weeks/${week.number}/`, state: { week: {id: week.id, number: week.number}}}}>
                                    <h3>Неделя {week.number}</h3>
                                    <div className="description">{week.short_description}</div>
                                </Link>
                            )}
                            {this.props.auth.isAuthenticated && this.props.auth.user.is_staff ? (
                                <Fragment>
                                    <hr/>
                                    <div className="action-buttons">
                                        <Link to={{pathname: `/courses/${this.props.course.id}/weeks/edit/${week.number}/`, state: { week: {id: week.id, number: week.number}}}} className="hover-animation">Редактировать</Link>
                                    </div>
                                </Fragment>
                            ) : ""}
                        </div>
                    )) }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    course_weeks: state.course_weeks.course_weeks,
    course: state.courses.course,
    auth: state.auth
});

export default connect(mapStateToProps, { showHeader, showFooter, getCourse, getCourseWeeks })(CourseWeeks);