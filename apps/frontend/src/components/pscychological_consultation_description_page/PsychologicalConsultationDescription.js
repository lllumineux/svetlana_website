import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getGeneralInfo} from "../../actions/general_info";
import {PopupWindow} from "../common/PopupWindow";

export class PsychologicalConsultationDescription extends Component {
    state = {
        isPopupShown: false
    }

    static propTypes = {
        getGeneralInfo: PropTypes.any.isRequired,
        general_info: PropTypes.shape({
            id: PropTypes.number,
            about_me_list: PropTypes.string.isRequired,
            greeting_video: PropTypes.string.isRequired,
            psychological_consultation_description: PropTypes.string.isRequired,
            whatsapp_number: PropTypes.string.isRequired,
            instagram_alias: PropTypes.string.isRequired,
            main_page_numbers_form_text: PropTypes.string.isRequired,
        }).isRequired
    };

    componentDidMount() {
        this.props.getGeneralInfo();
    }


    showPopup = () => {this.setState({isPopupShown: true})}
    hidePopup = () => {this.setState({isPopupShown: false})}

    render() {
        return (
            <Fragment>
                {(this.state.isPopupShown) ? <PopupWindow title="Запись на консультацию" content={<div>хуй</div>} hidePopup={this.hidePopup} /> : ""}
                <div className="content-header"><h2 className="title">Психологическая консультация</h2></div>
                <div className="editor-rendered-content psychological-consultation-description" dangerouslySetInnerHTML={{__html: this.props.general_info.psychological_consultation_description}}/>
                <button className="book-btn" onClick={this.showPopup}>Записаться</button>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    general_info: state.general_info.general_info,
});

export default connect(mapStateToProps, { getGeneralInfo })(PsychologicalConsultationDescription);