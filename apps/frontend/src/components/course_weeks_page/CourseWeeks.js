import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getCourseWeeks} from "../../actions/course_weeks";

export class CourseWeeks extends Component {
    static propTypes = {
        course_weeks: PropTypes.array.isRequired,
        getCourseWeeks: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getCourseWeeks(this.props.location.pathname.split("/").filter(obj => obj !== "").pop());
    }

    render() {
        return (
            <Fragment>
                <h2 className="content-title">Недели</h2>
                <div className="weeks">
                    { this.props.course_weeks.map(week => (
                        <div className="week " key={week.id}>
                            <Link to={`/weeks/${week.id}/`}>
                                <h3>Неделя {week.number}</h3>
                                <div className="description">{week.short_description}</div>
                            </Link>
                            <hr/>
                            <div className="action-buttons">
                                <Link to={`/weeks/edit/${week.id}`} className="hover-animation">Редактировать</Link>
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
});

export default connect(mapStateToProps, { getCourseWeeks })(CourseWeeks);