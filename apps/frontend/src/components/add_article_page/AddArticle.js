import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {tinyEditorSettings} from "../common/tiny_editor_config";
import {Editor} from "@tinymce/tinymce-react";
import {addArticle} from "../../actions/articles";
import {showFooter, showHeader} from "../../actions/page_management";

export class AddArticle extends Component {
    state = {
        name: "",
        content: "",
        is_hidden: true
    };

    static propTypes = {
        article: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            is_hidden: PropTypes.bool.isRequired
        }),
        addArticle: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.showHeader();
        this.props.showFooter();
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onEditorChange = e => this.setState({ content: e.target.getContent() });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.name !== "") {
            formData.append('name', this.state.name);
        }
        if (this.state.content !== "") {
            formData.append('content', this.state.content);
        }
        formData.append('is_hidden', this.state.is_hidden);
        this.props.addArticle(formData, () => {this.props.history.push({ pathname: `/articles/` }); location.reload();});
    };

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Добавление статьи</h2></div>
                <form onSubmit={this.onSubmit} className="input-forms">
                    <div className="input-form">
                        <h4>Название</h4>
                        <input type="text" name="name" placeholder="Введите текст" onChange={this.onChange}/>
                    </div>
                    <div className="input-form">
                        <h4>Содержание статьи</h4>
                        <Editor apiKey={tinyEditorSettings.apiKey} init={tinyEditorSettings.init} onChange={this.onEditorChange} />
                    </div>
                    <button type="submit" className="hover-animation">Добавить статью</button>
                </form>
            </Fragment>
        );
    };
}

export default connect(null, { showHeader, showFooter, addArticle })(AddArticle);