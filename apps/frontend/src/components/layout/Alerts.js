import React, {Component, Fragment} from "react";
import {withAlert} from "react-alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";

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
            if (error.msg.password_validation_failed) {
                error.msg.password_validation_failed.forEach((error_msg_content) => {
                    alert.error(error_msg_content);
                })
            }
            if (error.msg.username) alert.error(`Ник: ${error.msg.username.join().toLowerCase()}`);
            if (error.msg.password) alert.error(`Пароль: ${error.msg.password.join().toLowerCase()}`);


            // Course
            if (error.msg.name) alert.error(`Название: ${error.msg.name.join().toLowerCase()}`);
            if (error.msg.short_description) alert.error(`Краткое описание: ${error.msg.short_description.join().toLowerCase()}`);
            if (error.msg.full_description) alert.error(`Полное описание: ${error.msg.full_description.join().toLowerCase()}`);
            if (error.msg.price1) alert.error(`Цена за материалы: ${error.msg.price1.join().toLowerCase()}`);
            if (error.msg.price2) alert.error(`Цена за материалы + консультации: ${error.msg.price2.join().toLowerCase()}`);
            if (error.msg.background_img) alert.error(`Фоновое фото курса на главной странице: ${error.msg.background_img.join().toLowerCase()}`);

            // Articles
            if (error.msg.content) alert.error(`Содержание статьи: ${error.msg.content.join().toLowerCase()}`);
        }

        if (message !== prevProps.message) {
            // Unauthorized user messages
            if (message.addNumber) alert.success(message.addNumber);

            // Auth
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);

            // Course
            if (message.deleteCourse) alert.success(message.deleteCourse);
            if (message.invertCourseVisibility) alert.success(message.invertCourseVisibility);

            // Articles
            if (message.deleteArticle) alert.success(message.deleteArticle);
            if (message.invertArticleVisibility) alert.success(message.invertArticleVisibility);

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
