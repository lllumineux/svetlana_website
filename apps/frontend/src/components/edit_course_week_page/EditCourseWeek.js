import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getCourseWeek, updateCourseWeek} from "../../actions/course_weeks";

export class EditCourseWeek extends Component {
    state = {
        number: "",
        short_description: ""
    };

    static propTypes = {
        course_week: PropTypes.shape({
            id: PropTypes.number,
            number: PropTypes.any,
            short_description: PropTypes.string
        }),
        getCourseWeek: PropTypes.func.isRequired,
        updateCourseWeek: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getCourseWeek(this.props.location.state.week.id);
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.short_description !== "") {
            formData.append('short_description', this.state.short_description);
        }
        this.props.updateCourseWeek(
            this.props.location.state.week.id,
            formData,
            () => {
                this.props.history.push({
                    pathname: `/courses/${this.props.location.pathname.split("/").filter(obj => obj !== "")[1]}`
                });
                location.reload();
            }
        );
    };

    render() {
        return (
            <Fragment>
                <h2 className="content-title">Редактирование «Неделя {this.props.course_week.number}»</h2>
                <form onSubmit={this.onSubmit} className="input-forms">
                    <div className="input-form">
                        <h4>Краткое описание</h4>
                        <textarea name="short_description" placeholder="Введите текст" onChange={this.onChange} maxLength="340" defaultValue={this.props.course_week.short_description}/>
                    </div>
                    <button type="submit" className="hover-animation">Сохранить изменения</button>
                </form>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    course_week: state.course_weeks.course_week,
});

export default connect(mapStateToProps, { getCourseWeek, updateCourseWeek })(EditCourseWeek);