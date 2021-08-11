import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getCourseWeeks} from "../../actions/course_weeks";
import {getCourse} from "../../actions/courses";

export class CourseWeeks extends Component {
    static propTypes = {
        course_weeks: PropTypes.array.isRequired,
        getCourseWeeks: PropTypes.func.isRequired,
        getCourse: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getCourseWeeks(this.props.location.pathname.split("/").filter(obj => obj !== "").pop());
        this.props.getCourse(this.props.location.pathname.split("/").filter(obj => obj !== "").pop());
    }

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Курс: {this.props.course.name}</h2></div>
                <div className="weeks">
                    { this.props.course_weeks.map(week => (
                        <div className="week" key={week.id}>
                            <Link to={{pathname: `/courses/${this.props.course.id}/weeks/${week.number}/`, state: { week: {id: week.id, number: week.number}}}}>
                                <h3>Неделя {week.number}</h3>
                                <div className="description">{week.short_description}</div>
                            </Link>
                            <hr/>
                            <div className="action-buttons">
                                <Link to={{pathname: `/courses/${this.props.course.id}/weeks/edit/${week.number}/`, state: { week: {id: week.id, number: week.number}}}} className="hover-animation">Редактировать</Link>
                            </div>
                        </div>
                    )) }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    course_weeks: state.course_weeks.course_weeks,
    course: state.courses.course
});

export default connect(mapStateToProps, { getCourse, getCourseWeeks })(CourseWeeks);