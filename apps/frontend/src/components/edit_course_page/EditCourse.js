import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getCourse, updateCourse} from "../../actions/courses";
import {tinyEditorSettings} from "../common/tiny_editor_config";
import {Editor} from "@tinymce/tinymce-react";

export class EditCourse extends Component {
    state = {
        name: "",
        short_description: "",
        full_description: "",
        price1: "",
        price2: "",
        background_img: ""
    };

    static propTypes = {
        course: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            short_description: PropTypes.string,
            full_description: PropTypes.string,
            price1: PropTypes.any,
            price2: PropTypes.any,
            background_img: PropTypes.string,
            is_hidden: PropTypes.any
        }),
        getCourse: PropTypes.func.isRequired,
        updateCourse: PropTypes.func.isRequired
    };

    componentDidMount() {
        const url = this.props.location.pathname
        const course_id = parseInt(url.substring(url.lastIndexOf('/') + 1), 10)
        this.props.getCourse(course_id);
    }

    // Input form changes listeners
    onChange = e => {this.setState({ [e.target.name]: e.target.value });}
    onFileChange = e => {
        this.setState({ background_img: e.target.files[0] });
        document.getElementById("file-input-label").innerHTML = e.target.files[0].name;
    }
    onEditorChange = e => this.setState({ full_description: e.target.getContent() });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        const url = this.props.location.pathname
        const course_id = parseInt(url.substring(url.lastIndexOf('/') + 1), 10)
        const formData = new FormData();
        if (this.state.name !== "") {
            formData.append('name', this.state.name);
        }
        if (this.state.short_description !== "") {
            formData.append('short_description', this.state.short_description);
        }
        if (this.state.full_description !== "") {
            formData.append('full_description', this.state.full_description);
        }
        if (this.state.price1 !== "") {
            formData.append('price1', parseInt(this.state.price1, 10));
        }
        if (this.state.price2 !== "") {
            formData.append('price2', parseInt(this.state.price2, 10));
        }
        if (this.state.background_img !== "") {
            formData.append('background_img', this.state.background_img, this.state.background_img.name);
        }
        this.props.updateCourse(course_id, formData, () => window.location.replace("/courses/"));
    };

    render() {
        return (
            <Fragment>
                <h2 className="content-title">Редактирование курса</h2>
                <form onSubmit={this.onSubmit} className="input-forms">
                    <div className="input-form">
                        <h4>Название</h4>
                        <input type="text" name="name" placeholder="Введите текст" onChange={this.onChange} defaultValue={this.props.course.name}/>
                    </div>
                    <div className="input-form">
                        <h4>Краткое описание</h4>
                        <textarea name="short_description" placeholder="Введите текст" onChange={this.onChange} maxLength="340" defaultValue={this.props.course.short_description}/>
                    </div>
                    <div className="input-form">
                        <h4>Полное описание</h4>
                        <Editor apiKey={tinyEditorSettings.apiKey} init={tinyEditorSettings.init} initialValue={this.props.course.full_description} onChange={this.onEditorChange} />
                    </div>
                    <div className="input-form">
                        <h4>Цена за материалы</h4>
                        <input type="number" name="price1" placeholder="Введите значение" onChange={this.onChange} defaultValue={this.props.course.price1}/>
                    </div>
                    <div className="input-form">
                        <h4>Цена за материалы + консультации</h4>
                        <input type="number" name="price2" placeholder="Введите значение" onChange={this.onChange} defaultValue={this.props.course.price2}/>
                    </div>
                    <div className="input-form">
                        <h4 >Фоновое фото курса на главной странице</h4>
                        <div className="file-input-form">
                            <label htmlFor="file" id="file-input-label" className="hover-animation">
                                {(this.props.course.background_img !== "") ? (
                                    this.props.course.background_img.substring(this.props.course.background_img.lastIndexOf('/') + 1)
                                ) :"Выберите файл..."}
                            </label>
                            <input type="file" id="file" accept="image/png, image/jpeg" name="background_img" onChange={this.onFileChange}/>
                        </div>
                    </div>
                    <button type="submit" className="hover-animation">Сохранить изменения</button>
                </form>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    course: state.courses.course,
});

export default connect(mapStateToProps, { getCourse, updateCourse })(EditCourse);