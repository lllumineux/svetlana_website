import React, {Component, Fragment} from "react";
import {withAlert} from "react-alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {success} from "webpack-cli/lib/utils/logger";

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            // Auth
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());

            // Course
            if (error.msg.name) alert.error(`Название: ${error.msg.name.join()}`);
            if (error.msg.short_description) alert.error(`Краткое описание: ${error.msg.short_description.join()}`);
            if (error.msg.full_description) alert.error(`Полное описание: ${error.msg.full_description.join()}`);
            if (error.msg.price1) alert.error(`Цена за материалы: ${error.msg.price1.join()}`);
            if (error.msg.price2) alert.error(`Цена за материалы + консультации: ${error.msg.price2.join()}`);
            if (error.msg.background_img) alert.error(`Фоновое фото курса на главной странице: ${error.msg.background_img.join()}`);
        }

        if (message !== prevProps.message) {
            // Auth
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);

            // Course
            if (message.deleteCourse) alert.success(message.deleteCourse);

            // Users
            if (message.invertUserCourseAccess) alert.success(message.invertUserCourseAccess);

            // Reports
            if (message.sendReport) alert.success(message.sendReport);
        }
    }

    render() {
        return (
            <Fragment />
        )
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts));
