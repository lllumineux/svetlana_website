import React, { Component, Fragment } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addCourse} from "../../actions/courses";
import { Editor } from '@tinymce/tinymce-react';

export class AddCourse extends Component {
    state = {
        name: "",
        short_description: "",
        full_description: "",
        price1: "",
        price2: "",
        background_img: null
    };

    static propTypes = {
        addCourse: PropTypes.func.isRequired
    };

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onFileChange = e => {
        this.setState({ background_img: e.target.files[0] });
        document.getElementById("file-input-label").innerHTML = e.target.files[0].name;
    }
    onEditorChange = e => this.setState({ full_description: e.target.getContent() });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('short_description', this.state.short_description);
        formData.append('full_description', this.props.full_description);
        formData.append('price1', parseInt(this.state.price1, 10));
        formData.append('price2', parseInt(this.state.price2, 10));
        formData.append('background_img', this.state.background_img, this.state.background_img.name);
        this.props.addCourse(formData, () => window.location.replace("/courses/"));
    };

    render() {
        return (
            <Fragment>
                <h2 className="content-title">Добавление курса</h2>
                <form onSubmit={this.onSubmit} className="input-forms">
                    <div className="input-form">
                        <h5>Название</h5>
                        <input type="text" name="name" placeholder="Введите текст" onChange={this.onChange}/>
                    </div>
                    <div className="input-form">
                        <h5>Краткое описание</h5>
                        <textarea name="short_description" placeholder="Введите текст" onChange={this.onChange} maxLength="340"/>
                    </div>
                    <div className="input-form">
                        <h5>Полное описание</h5>
                        <Editor apiKey="ljh5ud1t395iha2irxyvff2cdnjehwnubw3gpufxv7a9z2pw" init={{
                            selector: "#myTextarea",
                            menubar: "edit insert format tools",
                            plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code " +
                                "fullscreen insertdatetime media table paste code help wordcount spellchecker",
                            toolbar: "undo redo | bold italic underline strikethrough | fontsizeselect formatselect | alignleft " +
                                "aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor " +
                                "backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | " +
                                "fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | " +
                                "a11ycheck ltr rtl | showcomments addcomment code"
                        }} onChange={this.onEditorChange}/>
                    </div>
                    <div className="input-form">
                        <h5>Цена за материалы</h5>
                        <input type="number" name="price1" placeholder="Введите значение" onChange={this.onChange}/>
                    </div>
                    <div className="input-form">
                        <h5>Цена за материалы + консультации</h5>
                        <input type="number" name="price2" placeholder="Введите значение" onChange={this.onChange}/>
                    </div>
                    <div className="input-form">
                        <h5 >Фоновое фото курса на главной странице</h5>
                        <div className="file-input-form">
                            <label htmlFor="file" id="file-input-label" className="hover-animation">Выберите файл...</label>
                            <input type="file" id="file" accept="image/png, image/jpeg" name="background_img" onChange={this.onFileChange}/>
                        </div>

                    </div>
                    <button type="submit" className="hover-animation">Добавить курс</button>
                </form>
            </Fragment>
        );
    };
}

export default connect(null, { addCourse })(AddCourse);