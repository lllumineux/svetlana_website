import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getCourseDay, updateCourseDay} from "../../actions/course_days";
import {Editor} from "@tinymce/tinymce-react";
import {tinyEditorSettings} from "../common/tiny_editor_config";
import {getReportQuestionsByDay} from "../../actions/reports";
import {showFooter, showHeader} from "../../actions/page_management";

export class EditCourseDay extends Component {
    state = {
        course_id: parseInt(this.props.location.pathname.split("/").filter(obj => obj !== "")[1], 10),
        week_number: parseInt(this.props.location.pathname.split("/").filter(obj => obj !== "")[3], 10),
        day_number: parseInt(this.props.location.pathname.split("/").filter(obj => obj !== "")[6], 10),
        name: "",
        short_description: "",
        content: "",
        report_questions: []
    };

    static propTypes = {
        course_day: PropTypes.object.isRequired,
        report_questions: PropTypes.array,
        getCourseDay: PropTypes.func.isRequired,
        updateCourseDay: PropTypes.func.isRequired,
        getReportQuestionsByDay: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.showHeader();
        this.props.showFooter();
        this.props.getCourseDay(this.state.course_id, this.state.week_number, this.state.day_number);
        this.props.getReportQuestionsByDay(this.state.course_id, this.state.week_number, this.state.day_number);
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onEditorChange = e => this.setState({ content: e.target.getContent() });
    onReportQuestionsChange = e => {
        if (this.state.report_questions.filter(obj => obj.id === parseInt(e.target.name.split("_")[1], 10)).length > 0) {
            const report_question = this.state.report_questions.find(obj => obj.id === parseInt(e.target.name.split("_")[1], 10));
            report_question.text = e.target.value;
        }
        else {
            this.setState({ report_questions: this.state.report_questions.concat(
                [{id: parseInt(e.target.name.split("_")[1], 10), text: e.target.value}]
            )});
        }
    }

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
        if (this.state.content !== "") {
            formData.append('content', this.state.content);
        }

        this.state.report_questions.map((report_question, index) => {
            formData.append(`report_question_${index}`, JSON.stringify({
                "id": report_question.id,
                "text": report_question.text
            }));
        })

        this.props.updateCourseDay(this.props.course_day.id, formData, () => {
            this.props.history.push(`/courses/${this.state.course_id}/weeks/${this.state.week_number}/`);
            location.reload();
        });
    };

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Редактирование «День {this.state.day_number}»</h2></div>
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
                    <div className="input-form">
                        <h4>Вопросы для отчёта по порядку</h4>
                        {this.props.report_questions.map(report_question => (
                            <input key={`question${report_question.id}`} type="text" name={`question_${report_question.id}`} placeholder="Введите текст" onChange={this.onReportQuestionsChange} defaultValue={report_question.text}/>
                        ))}
                    </div>
                    <button type="submit" className="hover-animation">Сохранить изменения</button>
                </form>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    report_questions : state.reports.report_questions,
    course_day: state.course_days.course_day,
});

export default connect(mapStateToProps, { showHeader, showFooter, getCourseDay, updateCourseDay, getReportQuestionsByDay })(EditCourseDay);