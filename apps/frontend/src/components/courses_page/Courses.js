import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourses, deleteCourse, invertCourseVisibility } from "../../actions/courses";
import {Link} from "react-router-dom";

export class Courses extends Component {
    static propTypes = {
        courses: PropTypes.array.isRequired,
        getCourses: PropTypes.func.isRequired,
        deleteCourse: PropTypes.func.isRequired,
        invertCourseVisibility: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getCourses();
    }

    render() {
        return (
            <Fragment>
                <h2 className="content-title">Курсы</h2>
                <div className="courses">
                    <Link to="/courses/add/" className="course add-course-button">
                        <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA1MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMjQiIHk9IjE0IiB3aWR0aD0iMyIgaGVpZ2h0PSIyMyIgcng9IjEuNSIgZmlsbD0iIzg4ODg4OCIvPgo8cmVjdCB4PSIzNyIgeT0iMjQiIHdpZHRoPSIzIiBoZWlnaHQ9IjIzIiByeD0iMS41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCAzNyAyNCkiIGZpbGw9IiM4ODg4ODgiLz4KPGNpcmNsZSBjeD0iMjUuNSIgY3k9IjI1LjUiIHI9IjI0IiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMyIvPgo8L3N2Zz4K" alt="Add course icon"/>
                        <div>Добавить курс</div>
                    </Link>
                    { this.props.courses.map(course => (
                        <div className="course" key={course.name + course.id}>
                            <Link to={`/courses/${course.id}/`}>
                                <h3>{course.name}</h3>
                                <div className="description">{course.short_description}</div>
                            </Link>
                            <hr/>
                            <div className="action-buttons">
                                <button onClick={this.props.deleteCourse.bind(this, course.id)}
                                        className="hover-animation">Удалить
                                </button>
                                <Link to={`/courses/edit/${course.id}/`}
                                      className="hover-animation">Редактировать</Link>
                                <button onClick={this.props.invertCourseVisibility.bind(this, course.id)}
                                        className="hover-animation">
                                    {course.is_hidden ? ("Показать") : ("Скрыть")}
                                </button>
                            </div>
                        </div>
                    )) }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    courses: state.courses.courses,
});

export default connect(mapStateToProps, { getCourses, deleteCourse, invertCourseVisibility })(Courses);