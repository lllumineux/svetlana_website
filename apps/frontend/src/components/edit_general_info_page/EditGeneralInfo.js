import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {tinyEditorSettings} from "../common/tiny_editor_config";
import {Editor} from "@tinymce/tinymce-react";
import {getGeneralInfo, updateGeneralInfo} from "../../actions/general_info";
import {addScreenshot, deleteScreenshot, getScreenshots, updateScreenshot} from "../../actions/screenshots";
import {hideLoader, showLoader, showFooter, showHeader} from "../../actions/page_management";

export class EditGeneralInfo extends Component {
    state = {
        about_me_list: "",
        greeting_video: "",
        psychological_consultation_description: "",
        whatsapp_number: "",
        instagram_alias: "",
        two_course_sale_value: ""
    };

    static propTypes = {
        general_info: PropTypes.object.isRequired,
        getGeneralInfo: PropTypes.func.isRequired,
        updateGeneralInfo: PropTypes.func.isRequired,
        getScreenshots: PropTypes.func.isRequired,
        deleteScreenshot: PropTypes.func.isRequired,
        addScreenshot: PropTypes.func.isRequired
    };

    componentDidMount() {
        (document.readyState === "complete") ? this.props.hideLoader() : window.addEventListener('load', this.props.hideLoader);
        this.props.showHeader();
        this.props.showFooter();
        this.props.getGeneralInfo();
        this.props.getScreenshots();
    }

    // Input form changes listeners
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onFileChange = e => {
        this.setState({ greeting_video: e.target.files[0] });
        document.getElementById("file-input-label").innerHTML = e.target.files[0].name;
    }
    onEditorChange = e => this.setState({ psychological_consultation_description: e.target.getContent() });
    onAddScreenshot = e => {
        const formData = new FormData();
        formData.append('content', e.target.files[0]);
        this.props.addScreenshot(formData);
    }
    onUpdateScreenshot = e => {
        const formData = new FormData();
        formData.append('content', e.target.files[0]);
        this.props.updateScreenshot(e.target.name.split("_")[2], formData);
    }

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        this.props.showLoader();
        const formData = new FormData();
        if (this.state.about_me_list !== "") {
            formData.append('about_me_list', this.state.about_me_list);
        }
        if (this.state.greeting_video !== "") {
            formData.append('greeting_video', this.state.greeting_video);
        }
        if (this.state.psychological_consultation_description !== "") {
            formData.append('psychological_consultation_description', this.state.psychological_consultation_description);
        }
        if (this.state.whatsapp_number !== "") {
            formData.append('whatsapp_number', this.state.whatsapp_number);
        }
        if (this.state.instagram_alias !== "") {
            formData.append('instagram_alias', this.state.instagram_alias);
        }
        if (this.state.two_course_sale_value !== "") {
            formData.append('two_course_sale_value', parseInt(this.state.two_course_sale_value, 10))
        }
        this.props.updateGeneralInfo(this.props.general_info.id, formData, () => location.reload());
    };

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Редактирование общей информации</h2></div>
                <form onSubmit={this.onSubmit} className="input-forms">
                    <div className="input-form">
                        <h4>Список обо мне <span className="gray">(перечислением через «;»)</span></h4>
                        <input type="text" name="about_me_list" placeholder="Введите текст" onChange={this.onChange} defaultValue={this.props.general_info.about_me_list}/>
                    </div>
                    <div className="input-form">
                        <h4>Приветственное видео</h4>
                        <div className="file-input-form">
                            <label htmlFor="file" id="file-input-label" className="hover-animation">
                                {(this.props.general_info.greeting_video !== "") ? (
                                    this.props.general_info.greeting_video.substring(this.props.general_info.greeting_video.lastIndexOf('/') + 1)
                                ) :"Выберите файл..."}
                            </label>
                            <input type="file" id="file" name="greeting_video" onChange={this.onFileChange}/>
                        </div>
                    </div>
                    <div className="input-form">
                        <h4>Описание психологической консультации</h4>
                        <Editor apiKey={tinyEditorSettings.apiKey} init={tinyEditorSettings.init} initialValue={this.props.general_info.psychological_consultation_description} onChange={this.onEditorChange} />
                    </div>
                    <div className="input-form">
                        <h4>Номер телефона WhatsApp <span className="gray">(в формате: +7 (906) 329-02-10)</span></h4>
                        <input type="text"  pattern="\+7 \([\d]{3}\) [\d]{3}-[\d]{2}-[\d]{2}" name="whatsapp_number" placeholder="Введите текст" onChange={this.onChange} defaultValue={this.props.general_info.whatsapp_number}/>
                    </div>
                    <div className="input-form">
                        <h4>Алиас Instagram <span className="gray">(в формате: psicholog_yoganieva)</span></h4>
                        <input type="text" name="instagram_alias" placeholder="Введите текст" onChange={this.onChange} defaultValue={this.props.general_info.instagram_alias}/>
                    </div>
                    <div className="input-form">
                        <h4>Размер скидки на покупку двух курсов сразу <span className="gray">(в процентах, например: 15)</span></h4>
                        <input type="text" pattern="\d+" name="two_course_sale_value" placeholder="Введите значение" onChange={this.onChange} defaultValue={this.props.general_info.two_course_sale_value}/>
                    </div>
                    <div className="input-form">
                        <h4>Скриншоты отзывов по порядку</h4>
                        {this.props.screenshots.map(screenshot => (
                            <div className="file-input-form" key={`screenshot_input_form_${screenshot.id}`}>
                                <label htmlFor={`screenshot_file_${screenshot.id}`} id="file-input-label" className="hover-animation">
                                    {(screenshot.content !== "") ? (
                                        screenshot.content.substring(screenshot.content.lastIndexOf('/') + 1)
                                    ) :"Выберите файл..."}
                                </label>
                                <input type="file" id={`screenshot_file_${screenshot.id}`} name={`screenshot_file_${screenshot.id}`} onChange={this.onUpdateScreenshot}/>
                                <button onClick={this.props.deleteScreenshot.bind(this, screenshot.id)} className="hover-animation">Удалить</button>
                            </div>
                        ))}
                        <div className="file-input-form">
                            <label htmlFor="add_screenshot_file" id="file-input-label" className="hover-animation">Выберите файл...</label>
                            <input type="file" id="add_screenshot_file" name="add_screenshot_file" onChange={this.onAddScreenshot}/>
                        </div>
                    </div>
                    <button type="submit" className="hover-animation">Сохранить изменения</button>
                </form>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    general_info: state.general_info.general_info,
    screenshots: state.screenshots.screenshots
});

export default connect(mapStateToProps, { hideLoader, showLoader, showHeader, showFooter, getGeneralInfo, updateGeneralInfo, getScreenshots, deleteScreenshot, addScreenshot, updateScreenshot })(EditGeneralInfo);