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
            if (error.msg.name) alert.error(`Название: ${error.msg.name.join()}`);
            if (error.msg.short_description) alert.error(`Краткое описание: ${error.msg.short_description.join()}`);
            if (error.msg.full_description) alert.error(`Полное описание: ${error.msg.full_description.join()}`);
            if (error.msg.price1) alert.error(`Цена за материалы: ${error.msg.price1.join()}`);
            if (error.msg.price2) alert.error(`Цена за материалы + консультации: ${error.msg.price2.join()}`);
            if (error.msg.background_img) alert.error(`Фоновое фото курса на главной странице: ${error.msg.background_img.join()}`);
        }

        if (message !== prevProps.message) {
            if (message.deleteCourse) alert.success(message.deleteCourse);
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