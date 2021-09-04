import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getCourse} from "../../actions/courses";
import {getCourseDay} from "../../actions/course_days";
import {Link} from "react-router-dom";
import {
    createReport,
    getReportByDay,
    getReportQuestionsByDay
} from "../../actions/reports";

export class CourseDay extends Component {
    state = {
        course_id: parseInt(this.props.location.pathname.split("/").filter(obj => obj !== "")[1], 10),
        week_number: parseInt(this.props.location.pathname.split("/").filter(obj => obj !== "")[3], 10),
        day_number: parseInt(this.props.location.pathname.split("/").filter(obj => obj !== "")[5], 10),
        report_answers: []
    };

    static propTypes = {
        report_questions: PropTypes.array.isRequired,
        course_day: PropTypes.any.isRequired,
        getCourseDay: PropTypes.func.isRequired,
        getCourse: PropTypes.func.isRequired,
        getReportQuestionsByDay: PropTypes.func.isRequired,
        getReportByDay: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getCourse(this.state.course_id);
        this.props.getCourseDay(this.state.course_id, this.state.week_number, this.state.day_number);
        this.props.getReportQuestionsByDay(this.state.course_id, this.state.week_number, this.state.day_number);
        this.props.getReportByDay(this.state.course_id, this.state.week_number, this.state.day_number);
    }

    // Input form changes listeners
    onChange = e => {
        if (this.state.report_answers.filter(obj => obj.report_question_id === parseInt(e.target.name.split("_")[2], 10)).length > 0) {
            const report_answer = this.state.report_answers.find(obj => obj.report_question_id === parseInt(e.target.name.split("_")[2], 10));
            report_answer.text = e.target.value;
        }
        else {
            this.setState({ report_answers: this.state.report_answers.concat(
                [{report_question_id: parseInt(e.target.name.split("_")[2], 10), text: e.target.value}]
            )});
        }
    }

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        const empty_report_answers = [];
        this.props.report_questions.forEach(question => {
            if (this.state.report_answers.filter(obj => obj.report_question_id === question.id).length === 0) {
               empty_report_answers.push({report_question_id: question.id, text: ""})
            }
        })
        const formData = new FormData();
        formData.append("day_id", this.props.course_day.id);
        formData.append("course_id", this.props.course.id);
        this.state.report_answers.concat(empty_report_answers).forEach((report_answer, index) => {
            formData.append(`report_item_${index}`, JSON.stringify({
                "question_id": report_answer.report_question_id,
                "answer_text": report_answer.text
            }))
        })
        this.props.createReport(formData);
    };

    isEmpty = obj => {
        for (let i in obj) { return false;}
        return true;
    }

    render() {
        return (
            <Fragment>
                <div className="content-header">
                    <h2 className="title">Курс: {this.props.course.name}</h2>
                    <div className="content-controls">
                        <Link to={`/courses/${this.props.course.id}/weeks/${this.state.week_number}/`}>
                            <span className="addition hover-animation">Неделя {this.state.week_number}</span>
                        </Link>
                        <div className="slider-control">
                            {
                                (this.state.day_number > 1)  ? (
                                    <Link to={`/courses/${this.state.course_id}/weeks/${this.state.week_number}/days/${this.state.day_number - 1}/`} onClick={
                                        () => {
                                            this.props.history.push(`/courses/${this.state.course_id}/weeks/${this.state.week_number}/days/${this.state.day_number - 1}/`);
                                            location.reload();
                                        }
                                    } className="control-button hover-animation">
                                        <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0yLjIyMjEgNS4zOTAyTDYuNjcyMjMgOS44NDAyNUM2Ljc3NTE1IDkuOTQzMjUgNi45MTI1NSAxMCA3LjA1OTA1IDEwQzcuMjA1NTUgMTAgNy4zNDI5NSA5Ljk0MzI1IDcuNDQ1ODggOS44NDAyNUw3Ljc3MzYgOS41MTI2MUM3Ljk4Njg1IDkuMjk5MTEgNy45ODY4NSA4Ljk1MjEyIDcuNzczNiA4LjczODk1TDQuMDM2NzIgNS4wMDIwN0w3Ljc3Nzc1IDEuMjYxMDVDNy44ODA2NyAxLjE1ODA0IDcuOTM3NSAxLjAyMDcyIDcuOTM3NSAwLjg3NDMwMkM3LjkzNzUgMC43Mjc3MTcgNy44ODA2NyAwLjU5MDQwMSA3Ljc3Nzc1IDAuNDg3MzEyTDcuNDUwMDMgMC4xNTk3NTRDNy4zNDcwMiAwLjA1Njc0NzQgNy4yMDk3IC02LjM2MjYyZS0wOCA3LjA2MzIgLTcuNjQzMzllLTA4QzYuOTE2NyAtOC45MjQxNmUtMDggNi43NzkzIDAuMDU2NzQ3MyA2LjY3NjM3IDAuMTU5NzU0TDIuMjIyMSA0LjYxMzg2QzIuMTE4OTMgNC43MTcyIDIuMDYyMjYgNC44NTUxNiAyLjA2MjU5IDUuMDAxODNDMi4wNjIyNiA1LjE0OTA2IDIuMTE4OTMgNS4yODY5NSAyLjIyMjEgNS4zOTAyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwIDEwKSByb3RhdGUoLTE4MCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="Previous Week"/>
                                    </Link>
                                ) : (
                                    <div className="control-button disabled">
                                        <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0yLjIyMjEgNS4zOTAyTDYuNjcyMjMgOS44NDAyNUM2Ljc3NTE1IDkuOTQzMjUgNi45MTI1NSAxMCA3LjA1OTA1IDEwQzcuMjA1NTUgMTAgNy4zNDI5NSA5Ljk0MzI1IDcuNDQ1ODggOS44NDAyNUw3Ljc3MzYgOS41MTI2MUM3Ljk4Njg1IDkuMjk5MTEgNy45ODY4NSA4Ljk1MjEyIDcuNzczNiA4LjczODk1TDQuMDM2NzIgNS4wMDIwN0w3Ljc3Nzc1IDEuMjYxMDVDNy44ODA2NyAxLjE1ODA0IDcuOTM3NSAxLjAyMDcyIDcuOTM3NSAwLjg3NDMwMkM3LjkzNzUgMC43Mjc3MTcgNy44ODA2NyAwLjU5MDQwMSA3Ljc3Nzc1IDAuNDg3MzEyTDcuNDUwMDMgMC4xNTk3NTRDNy4zNDcwMiAwLjA1Njc0NzQgNy4yMDk3IC02LjM2MjYyZS0wOCA3LjA2MzIgLTcuNjQzMzllLTA4QzYuOTE2NyAtOC45MjQxNmUtMDggNi43NzkzIDAuMDU2NzQ3MyA2LjY3NjM3IDAuMTU5NzU0TDIuMjIyMSA0LjYxMzg2QzIuMTE4OTMgNC43MTcyIDIuMDYyMjYgNC44NTUxNiAyLjA2MjU5IDUuMDAxODNDMi4wNjIyNiA1LjE0OTA2IDIuMTE4OTMgNS4yODY5NSAyLjIyMjEgNS4zOTAyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwIDEwKSByb3RhdGUoLTE4MCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="Previous Week"/>
                                    </div>
                                )
                            }
                            <span className="current_day">День {this.state.day_number}</span>
                            {
                                (this.state.day_number < 7) ? (
                                    <Link to={`/courses/${this.state.course_id}/weeks/${this.state.week_number}/days/${this.state.day_number + 1}/`} onClick={
                                        () => {
                                            this.props.history.push(`/courses/${this.state.course_id}/weeks/${this.state.week_number}/days/${this.state.day_number + 1}/`);
                                            location.reload();
                                        }
                                    } className="control-button hover-animation">
                                        <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNzc3OSA0LjYwOThMMy4zMjc3NyAwLjE1OTc1NUMzLjIyNDg1IDAuMDU2NzQ3NSAzLjA4NzQ1IDAgMi45NDA5NSAwQzIuNzk0NDUgMCAyLjY1NzA1IDAuMDU2NzQ3NSAyLjU1NDEyIDAuMTU5NzU1TDIuMjI2NCAwLjQ4NzM5NEMyLjAxMzE1IDAuNzAwODg5IDIuMDEzMTUgMS4wNDc4OCAyLjIyNjQgMS4yNjEwNUw1Ljk2MzI4IDQuOTk3OTNMMi4yMjIyNSA4LjczODk1QzIuMTE5MzMgOC44NDE5NiAyLjA2MjUgOC45NzkyOCAyLjA2MjUgOS4xMjU3QzIuMDYyNSA5LjI3MjI4IDIuMTE5MzMgOS40MDk2IDIuMjIyMjUgOS41MTI2OUwyLjU0OTk4IDkuODQwMjVDMi42NTI5OCA5Ljk0MzI1IDIuNzkwMyAxMCAyLjkzNjggMTBDMy4wODMzIDEwIDMuMjIwNyA5Ljk0MzI1IDMuMzIzNjMgOS44NDAyNUw3Ljc3NzkgNS4zODYxNEM3Ljg4MTA3IDUuMjgyOCA3LjkzNzc0IDUuMTQ0ODQgNy45Mzc0MSA0Ljk5ODE3QzcuOTM3NzQgNC44NTA5NCA3Ljg4MTA3IDQuNzEzMDUgNy43Nzc5IDQuNjA5OFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" alt="Previous Week"/>
                                    </Link>
                                ) : (
                                    <div className="control-button disabled">
                                        <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNzc3OSA0LjYwOThMMy4zMjc3NyAwLjE1OTc1NUMzLjIyNDg1IDAuMDU2NzQ3NSAzLjA4NzQ1IDAgMi45NDA5NSAwQzIuNzk0NDUgMCAyLjY1NzA1IDAuMDU2NzQ3NSAyLjU1NDEyIDAuMTU5NzU1TDIuMjI2NCAwLjQ4NzM5NEMyLjAxMzE1IDAuNzAwODg5IDIuMDEzMTUgMS4wNDc4OCAyLjIyNjQgMS4yNjEwNUw1Ljk2MzI4IDQuOTk3OTNMMi4yMjIyNSA4LjczODk1QzIuMTE5MzMgOC44NDE5NiAyLjA2MjUgOC45NzkyOCAyLjA2MjUgOS4xMjU3QzIuMDYyNSA5LjI3MjI4IDIuMTE5MzMgOS40MDk2IDIuMjIyMjUgOS41MTI2OUwyLjU0OTk4IDkuODQwMjVDMi42NTI5OCA5Ljk0MzI1IDIuNzkwMyAxMCAyLjkzNjggMTBDMy4wODMzIDEwIDMuMjIwNyA5Ljk0MzI1IDMuMzIzNjMgOS44NDAyNUw3Ljc3NzkgNS4zODYxNEM3Ljg4MTA3IDUuMjgyOCA3LjkzNzc0IDUuMTQ0ODQgNy45Mzc0MSA0Ljk5ODE3QzcuOTM3NzQgNC44NTA5NCA3Ljg4MTA3IDQuNzEzMDUgNy43Nzc5IDQuNjA5OFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" alt="Previous Week"/>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>
                {this.props.course_day.is_locked ? (
                    <div className="course-locked-warning">У вас пока нет доступа к этому занятию!</div>
                ) : (
                    <div className="editor-rendered-content" dangerouslySetInnerHTML={{__html: this.props.course_day.content}}/>
                )}
                {this.props.report_questions.length > 0 ? (
                    <div className="report">
                        <h4>Отчёт по занятию</h4>
                        <div className="warning">Будьте внимательны при написании отчёта - после его отправки у вас не будет возможности изменить данные!</div>
                        <form onSubmit={this.onSubmit} className="report-forms">
                            {(!this.isEmpty(this.props.report)) ? (
                                this.props.report.items.map(report_item => (
                                    <div className="report-question-form report-question-form-disabled" key={`report-question-form_${report_item.id}`}>
                                        <h5>{report_item.question.text}</h5>
                                        <textarea defaultValue={report_item.answer} disabled/>
                                    </div>
                                ))
                            ) : (
                                this.props.report_questions.map(report_question => (
                                    <div className="report-question-form" key={`report-question-form_${report_question.id}`}>
                                        <h5>{report_question.text}</h5>
                                        <textarea name={`report_question_${report_question.id}`} placeholder="Введите ответ на вопрос" onChange={this.onChange}/>
                                    </div>
                                ))
                            )}
                            <div className="submit-button-wrapper">
                                {(!this.isEmpty(this.props.report) ? (
                                    <button disabled>Отправить</button>
                                ) : (
                                   <button type="submit" className="hover-animation">Отправить</button>
                                ))}
                            </div>
                        </form>
                    </div>
                ) : ""}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    course_day: state.course_days.course_day,
    course: state.courses.course,
    report_questions: state.reports.report_questions,
    report: state.reports.report
});

export default connect(mapStateToProps, { getCourse, getCourseDay, getReportQuestionsByDay, createReport, getReportByDay })(CourseDay);