import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getContactInfo, getGeneralInfo} from "../../actions/general_info";
import {PopupWindow} from "../common/PopupWindow";

export class PsychologicalConsultationDescription extends Component {
    state = {
        isPopupShown: false
    }

    static propTypes = {
        getGeneralInfo: PropTypes.any.isRequired,
        general_info: PropTypes.object.isRequired,
        getContactInfo: PropTypes.func.isRequired,
        contact_info: PropTypes.shape({
            whatsapp_number: PropTypes.string,
            whatsapp_link: PropTypes.string,
            instagram_alias: PropTypes.string,
            instagram_link: PropTypes.string
        })
    };

    componentDidMount() {
        this.props.getGeneralInfo();
    }


    showPopup = () => {this.setState({isPopupShown: true})}
    hidePopup = () => {this.setState({isPopupShown: false})}

    render() {
        return (
            <Fragment>
                {(this.state.isPopupShown) ?
                    <PopupWindow
                        title="Запись на консультацию"
                        content={
                            <div className="psychological-consultation-description-popup-window-content">Для записи на консультацию, свяжитесь со мной любым удобным способом: через <strong>WhatsApp</strong> по номеру <strong><u><a href={this.props.contact_info.whatsapp_link} target="_blank">{this.props.contact_info.whatsapp_number}</a></u></strong>, либо через <strong>Instagram</strong> по нику <strong><u><a href={this.props.contact_info.instagram_link} target="_blank">{this.props.contact_info.instagram_alias}</a></u></strong></div>
                        }
                        hidePopup={this.hidePopup}
                    /> : ""
                }
                <div className="content-header"><h2 className="title">Психологическая консультация</h2></div>
                <div className="editor-rendered-content psychological-consultation-description editor-rendered-content" dangerouslySetInnerHTML={{__html: this.props.general_info.psychological_consultation_description}}/>
                <button className="book-btn" onClick={this.showPopup}>Записаться</button>
                {this.state.isPopupShown ? <style>{"html {overflow: hidden;}"}</style> : ""}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    general_info: state.general_info.general_info,
    contact_info: state.general_info.contact_info
});

export default connect(mapStateToProps, { getGeneralInfo, getContactInfo })(PsychologicalConsultationDescription);