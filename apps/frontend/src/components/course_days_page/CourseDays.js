import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getCourse} from "../../actions/courses";
import {getCourseDays} from "../../actions/course_days";

export class CourseDays extends Component {
    static propTypes = {
        course_days: PropTypes.array.isRequired,
        getCourseDays: PropTypes.func.isRequired,
        getCourse: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getCourseDays(this.props.location.state.week.id);
        this.props.getCourse(this.props.location.pathname.split("/").filter(obj => obj !== "")[1]);
    }

    render() {
        return (
            <Fragment>
                <div className="content-header">
                    <h2 className="title">Курс: {this.props.course.name}</h2>
                    <div className="content-controls">
                        {
                            (this.props.location.state.week.number > 1) ? (
                                <div className="control-button hover-animation">
                                    <Link to={{
                                        pathname: `/courses/${this.props.course.id}/weeks/${this.props.location.state.week.number - 1}/`,
                                        state: { week: {id: this.props.location.state.week.id - 1, number: this.props.location.state.week.number - 1}}
                                    }} onClick={
                                        () => {
                                            this.props.history.push({
                                                pathname: `/courses/${this.props.course.id}/weeks/${this.props.location.state.week.number - 1}/`,
                                                state: { week: {id: this.props.location.state.week.id + 1, number: this.props.location.state.week.number - 1}}
                                            });
                                            location.reload();
                                        }
                                    }>
                                        <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0yLjIyMjEgNS4zOTAyTDYuNjcyMjMgOS44NDAyNUM2Ljc3NTE1IDkuOTQzMjUgNi45MTI1NSAxMCA3LjA1OTA1IDEwQzcuMjA1NTUgMTAgNy4zNDI5NSA5Ljk0MzI1IDcuNDQ1ODggOS44NDAyNUw3Ljc3MzYgOS41MTI2MUM3Ljk4Njg1IDkuMjk5MTEgNy45ODY4NSA4Ljk1MjEyIDcuNzczNiA4LjczODk1TDQuMDM2NzIgNS4wMDIwN0w3Ljc3Nzc1IDEuMjYxMDVDNy44ODA2NyAxLjE1ODA0IDcuOTM3NSAxLjAyMDcyIDcuOTM3NSAwLjg3NDMwMkM3LjkzNzUgMC43Mjc3MTcgNy44ODA2NyAwLjU5MDQwMSA3Ljc3Nzc1IDAuNDg3MzEyTDcuNDUwMDMgMC4xNTk3NTRDNy4zNDcwMiAwLjA1Njc0NzQgNy4yMDk3IC02LjM2MjYyZS0wOCA3LjA2MzIgLTcuNjQzMzllLTA4QzYuOTE2NyAtOC45MjQxNmUtMDggNi43NzkzIDAuMDU2NzQ3MyA2LjY3NjM3IDAuMTU5NzU0TDIuMjIyMSA0LjYxMzg2QzIuMTE4OTMgNC43MTcyIDIuMDYyMjYgNC44NTUxNiAyLjA2MjU5IDUuMDAxODNDMi4wNjIyNiA1LjE0OTA2IDIuMTE4OTMgNS4yODY5NSAyLjIyMjEgNS4zOTAyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwIDEwKSByb3RhdGUoLTE4MCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="Previous Week"/>
                                    </Link>
                                </div>
                            ) : (
                                <div className="control-button disabled">
                                    <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0yLjIyMjEgNS4zOTAyTDYuNjcyMjMgOS44NDAyNUM2Ljc3NTE1IDkuOTQzMjUgNi45MTI1NSAxMCA3LjA1OTA1IDEwQzcuMjA1NTUgMTAgNy4zNDI5NSA5Ljk0MzI1IDcuNDQ1ODggOS44NDAyNUw3Ljc3MzYgOS41MTI2MUM3Ljk4Njg1IDkuMjk5MTEgNy45ODY4NSA4Ljk1MjEyIDcuNzczNiA4LjczODk1TDQuMDM2NzIgNS4wMDIwN0w3Ljc3Nzc1IDEuMjYxMDVDNy44ODA2NyAxLjE1ODA0IDcuOTM3NSAxLjAyMDcyIDcuOTM3NSAwLjg3NDMwMkM3LjkzNzUgMC43Mjc3MTcgNy44ODA2NyAwLjU5MDQwMSA3Ljc3Nzc1IDAuNDg3MzEyTDcuNDUwMDMgMC4xNTk3NTRDNy4zNDcwMiAwLjA1Njc0NzQgNy4yMDk3IC02LjM2MjYyZS0wOCA3LjA2MzIgLTcuNjQzMzllLTA4QzYuOTE2NyAtOC45MjQxNmUtMDggNi43NzkzIDAuMDU2NzQ3MyA2LjY3NjM3IDAuMTU5NzU0TDIuMjIyMSA0LjYxMzg2QzIuMTE4OTMgNC43MTcyIDIuMDYyMjYgNC44NTUxNiAyLjA2MjU5IDUuMDAxODNDMi4wNjIyNiA1LjE0OTA2IDIuMTE4OTMgNS4yODY5NSAyLjIyMjEgNS4zOTAyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwIDEwKSByb3RhdGUoLTE4MCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="Previous Week"/>
                                </div>
                            )
                        }
                        <span className="current_week">Неделя {this.props.location.state.week.number}</span>
                        {
                            (this.props.location.state.week.number < 4) ? (
                                <div className="control-button hover-animation">
                                    <Link to={{
                                        pathname: `/courses/${this.props.course.id}/weeks/${this.props.location.state.week.number + 1}/`,
                                        state: { week: {id: this.props.location.state.week.id + 1, number: this.props.location.state.week.number + 1}}
                                    }} onClick={
                                        () => {
                                            this.props.history.push({
                                                pathname: `/courses/${this.props.course.id}/weeks/${this.props.location.state.week.number + 1}/`,
                                                state: { week: {id: this.props.location.state.week.id + 1, number: this.props.location.state.week.number + 1}}
                                            });
                                            location.reload();
                                        }
                                    }>
                                    <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNzc3OSA0LjYwOThMMy4zMjc3NyAwLjE1OTc1NUMzLjIyNDg1IDAuMDU2NzQ3NSAzLjA4NzQ1IDAgMi45NDA5NSAwQzIuNzk0NDUgMCAyLjY1NzA1IDAuMDU2NzQ3NSAyLjU1NDEyIDAuMTU5NzU1TDIuMjI2NCAwLjQ4NzM5NEMyLjAxMzE1IDAuNzAwODg5IDIuMDEzMTUgMS4wNDc4OCAyLjIyNjQgMS4yNjEwNUw1Ljk2MzI4IDQuOTk3OTNMMi4yMjIyNSA4LjczODk1QzIuMTE5MzMgOC44NDE5NiAyLjA2MjUgOC45NzkyOCAyLjA2MjUgOS4xMjU3QzIuMDYyNSA5LjI3MjI4IDIuMTE5MzMgOS40MDk2IDIuMjIyMjUgOS41MTI2OUwyLjU0OTk4IDkuODQwMjVDMi42NTI5OCA5Ljk0MzI1IDIuNzkwMyAxMCAyLjkzNjggMTBDMy4wODMzIDEwIDMuMjIwNyA5Ljk0MzI1IDMuMzIzNjMgOS44NDAyNUw3Ljc3NzkgNS4zODYxNEM3Ljg4MTA3IDUuMjgyOCA3LjkzNzc0IDUuMTQ0ODQgNy45Mzc0MSA0Ljk5ODE3QzcuOTM3NzQgNC44NTA5NCA3Ljg4MTA3IDQuNzEzMDUgNy43Nzc5IDQuNjA5OFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" alt="Previous Week"/>
                                    </Link>
                                </div>
                            ) : (
                                <div className="control-button disabled">
                                    <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNzc3OSA0LjYwOThMMy4zMjc3NyAwLjE1OTc1NUMzLjIyNDg1IDAuMDU2NzQ3NSAzLjA4NzQ1IDAgMi45NDA5NSAwQzIuNzk0NDUgMCAyLjY1NzA1IDAuMDU2NzQ3NSAyLjU1NDEyIDAuMTU5NzU1TDIuMjI2NCAwLjQ4NzM5NEMyLjAxMzE1IDAuNzAwODg5IDIuMDEzMTUgMS4wNDc4OCAyLjIyNjQgMS4yNjEwNUw1Ljk2MzI4IDQuOTk3OTNMMi4yMjIyNSA4LjczODk1QzIuMTE5MzMgOC44NDE5NiAyLjA2MjUgOC45NzkyOCAyLjA2MjUgOS4xMjU3QzIuMDYyNSA5LjI3MjI4IDIuMTE5MzMgOS40MDk2IDIuMjIyMjUgOS41MTI2OUwyLjU0OTk4IDkuODQwMjVDMi42NTI5OCA5Ljk0MzI1IDIuNzkwMyAxMCAyLjkzNjggMTBDMy4wODMzIDEwIDMuMjIwNyA5Ljk0MzI1IDMuMzIzNjMgOS44NDAyNUw3Ljc3NzkgNS4zODYxNEM3Ljg4MTA3IDUuMjgyOCA3LjkzNzc0IDUuMTQ0ODQgNy45Mzc0MSA0Ljk5ODE3QzcuOTM3NzQgNC44NTA5NCA3Ljg4MTA3IDQuNzEzMDUgNy43Nzc5IDQuNjA5OFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" alt="Previous Week"/>
                            </div>
                            )
                        }
                    </div>
                </div>
                <div className="days">
                    { this.props.course_days.map(day => (
                        <div className="day" key={day.id}>
                            <Link
                                to={{
                                    pathname: `/courses/${this.props.course.id}/weeks/${this.props.location.state.week.number}/days/${day.number}/`,
                                    state: { week: {id: this.props.location.state.week.id, number: this.props.location.state.week.number}, day: {id: day.id, number: day.number, name: day.name}}
                                }}>
                                <div className="day-info-wrapper hover-animation">
                                    <h3>День {day.number}</h3>
                                    <div className="day-info-inner">
                                        <h4 className="name">{day.name}</h4>
                                        <div className="description">{day.short_description}</div>
                                    </div>
                                </div>
                            </Link>
                            <hr/>
                            <div className="action-buttons">
                                <Link
                                    to={{
                                        pathname: `/courses/${this.props.course.id}/weeks/${this.props.location.state.week.number}/days/edit/${day.number}/`,
                                        state: { week: {id: this.props.location.state.week.id, number: this.props.location.state.week.number}, day: {id: day.id}}
                                    }} className="hover-animation">Редактировать
                                </Link>
                            </div>
                        </div>
                    )) }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    course_days: state.course_days.course_days,
    course: state.courses.course
});

export default connect(mapStateToProps, { getCourse, getCourseDays })(CourseDays);