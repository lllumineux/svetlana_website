import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getGeneralInfo, updateGeneralInfo} from "../../actions/general_info";
import {getNumbers} from "../../actions/numbers";
import {hideLoader, showFooter, showHeader} from "../../actions/page_management";

export class Numbers extends Component {
    state = {
        numbers_text: ""
    };

    static propTypes = {
        numbers: PropTypes.array.isRequired,
        general_info: PropTypes.object.isRequired,
        getNumbers: PropTypes.func.isRequired,
        getGeneralInfo: PropTypes.func.isRequired,
        updateGeneralInfo: PropTypes.func.isRequired
    };

    componentDidMount() {
        (document.readyState === "complete") ? this.props.hideLoader() : window.addEventListener('load', this.props.hideLoader);
        this.props.showHeader();
        this.props.showFooter();
        this.props.getNumbers();
        this.props.getGeneralInfo();
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.numbers_text !== "") {
            formData.append("main_page_numbers_form_text", this.state.numbers_text);
        }
        this.props.updateGeneralInfo(this.props.general_info.id, formData, () => location.reload());
    };

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Номера</h2></div>
                <form onSubmit={this.onSubmit} className="input-forms">
                    <div className="input-form">
                        <h4>Текст на главной странице</h4>
                        <textarea name="numbers_text" placeholder="Введите текст" onChange={this.onChange} defaultValue={this.props.general_info.main_page_numbers_form_text}/>
                    </div>
                    <button type="submit" className="hover-animation">Сохранить изменения</button>
                </form>
                <div className="numbers">
                    {this.props.numbers.map(number => (
                        <div key={`number_${number.id}`}>{number.text}</div>
                    ))}
                </div>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    numbers: state.numbers.numbers,
    general_info: state.general_info.general_info
});

export default connect(mapStateToProps, { hideLoader, showHeader, showFooter, getNumbers, getGeneralInfo, updateGeneralInfo })(Numbers);