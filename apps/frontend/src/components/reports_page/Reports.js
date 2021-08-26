import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getGeneralInfo, updateGeneralInfo} from "../../actions/general_info";
import {getNumbers} from "../../actions/numbers";
import {getReports} from "../../actions/reports";

export class Reports extends Component {
    static propTypes = {
        getReports: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getReports();
    }

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Отчёты</h2></div>
                <div className="reports">
                    {this.props.reports.map(report => (
                        <div className="report" key={report.id}>
                            <div className="report-info">
                                <div className="author-username">{report.user.username}</div>
                                <div className="upload-time">{report.upload_time}</div>
                            </div>
                            <div className="report-forms-disabled">
                                {report.items.map(report_item => (
                                    <div className="report-question-form-disabled" key={`report-question-form_${report_item.id}`}>
                                        <h5>{report_item.question.text}</h5>
                                        <input type="text" defaultValue={report_item.answer} disabled/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports
});

export default connect(mapStateToProps, { getReports })(Reports);