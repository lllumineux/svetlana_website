import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getCourseDay, updateCourseDay} from "../../actions/course_days";
import {Editor} from "@tinymce/tinymce-react";
import {tinyEditorSettings} from "../common/tiny_editor_config";

export class EditCourseDay extends Component {
    state = {
        name: "",
        short_description: "",
        content: ""
    };

    static propTypes = {
        course_day: PropTypes.shape({
            id: PropTypes.number,
            number: PropTypes.number,
            name: PropTypes.string,
            short_description: PropTypes.string,
            content: PropTypes.string
        }),
        getCourseDay: PropTypes.func.isRequired,
        updateCourseDay: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getCourseDay(this.props.location.state.day.id);
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onEditorChange = e => this.setState({ content: e.target.getContent() });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.name !== "") {
            formData.append('name', this.state.name);
        }
        if (this.state.short_description !== "") {
            formData.append('short_description', this.state.short_description);
        }
        this.props.updateCourseDay(
            this.props.course_day.id,
            formData,
            () => {
                this.props.history.push({
                    pathname: `/courses/${this.props.location.pathname.split("/").filter(obj => obj !== "")[1]}/weeks/${this.props.course_day.number}/`,
                    state: { week: {id: this.props.location.state.week.id, number: this.props.location.state.week.number}}
                });
                location.reload();
            },
        );
    };

    render() {
        return (
            <Fragment>
                <h2 className="content-title">Редактирование «День {this.props.course_day.number}»</h2>
                <form onSubmit={this.onSubmit} className="input-forms">
                    <div className="input-form">
                        <h4>Название</h4>
                        <input type="text" name="name" placeholder="Введите текст" onChange={this.onChange} defaultValue={this.props.course_day.name}/>
                    </div>
                    <div className="input-form">
                        <h4>Краткое описание</h4>
                        <textarea name="short_description" placeholder="Введите текст" onChange={this.onChange} maxLength="340" defaultValue={this.props.course_day.short_description}/>
                    </div>
                    <div className="input-form">
                        <h4>Материалы занятия</h4>
                        <Editor apiKey={tinyEditorSettings.apiKey} init={tinyEditorSettings.init} initialValue={this.props.course_day.content} onChange={this.onEditorChange} />
                    </div>
                    <button type="submit" className="hover-animation">Сохранить изменения</button>
                </form>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    course_day: state.course_days.course_day,
});

export default connect(mapStateToProps, { getCourseDay, updateCourseDay })(EditCourseDay);