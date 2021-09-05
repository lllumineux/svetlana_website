import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getCourseWeek, updateCourseWeek} from "../../actions/course_weeks";
import {hideLoader, showLoader, showFooter, showHeader} from "../../actions/page_management";

export class EditCourseWeek extends Component {
    state = {
        course_id: parseInt(this.props.location.pathname.split("/").filter(obj => obj !== "")[1], 10),
        week_number: parseInt(this.props.location.pathname.split("/").filter(obj => obj !== "")[4], 10),
        number: "",
        short_description: ""
    };

    static propTypes = {
        course_week: PropTypes.shape({
            id: PropTypes.number.isRequired,
            number: PropTypes.any.isRequired,
            short_description: PropTypes.string.isRequired
        }),
        getCourseWeek: PropTypes.func.isRequired,
        updateCourseWeek: PropTypes.func.isRequired
    };

    componentDidMount() {
        (document.readyState === "complete") ? this.props.hideLoader() : window.addEventListener('load', this.props.hideLoader);
        this.props.showHeader();
        this.props.showFooter();
        this.props.getCourseWeek(this.state.course_id, this.state.week_number);
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        this.props.showLoader();
        const formData = new FormData();
        if (this.state.short_description !== "") {
            formData.append('short_description', this.state.short_description);
        }
        this.props.updateCourseWeek(
            this.props.course_week.id,
            formData,
            () => {
                this.props.history.push(`/courses/${this.state.course_id}`);
                location.reload();
            }
        );
    };

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Редактирование «Неделя {this.props.course_week.number}»</h2></div>
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

export default connect(mapStateToProps, { hideLoader, showLoader, showHeader, showFooter, getCourseWeek, updateCourseWeek })(EditCourseWeek);