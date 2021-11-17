import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {tinyEditorSettings} from "../common/tiny_editor_config";
import {Editor} from "@tinymce/tinymce-react";
import {getArticle, updateArticle} from "../../actions/articles";
import {hideLoader, showLoader, showFooter, showHeader} from "../../actions/page_management";

export class EditArticle extends Component {
    state = {
        name: "",
        content: ""
    };

    static propTypes = {
        article: PropTypes.object.isRequired,
        getArticle: PropTypes.func.isRequired,
        updateArticle: PropTypes.func.isRequired
    };

    componentDidMount() {
        (document.readyState === "complete") ? this.props.hideLoader() : window.addEventListener('load', this.props.hideLoader);
        this.props.showHeader();
        this.props.showFooter();
        this.props.getArticle(this.props.location.pathname.split("/").filter(obj => obj !== "").pop());
    }

    // Input form changes listeners
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onEditorChange = e => this.setState({ content: e.target.getContent() });

    // Submit listener
    onSubmit = e => {
        e.preventDefault();
        this.props.showLoader();
        const formData = new FormData();
        if (this.state.name !== "") {
            formData.append('name', this.state.name);
        }
        if (this.state.content !== "") {
            formData.append('content', this.state.content);
        }
        this.props.updateArticle(this.props.article.id, formData, () => {this.props.history.push({ pathname: `/articles/` }); location.reload();});
    };

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Редактирование статьи</h2></div>
                <form onSubmit={this.onSubmit} className="input-forms">
                    <div className="input-form">
                        <h4>Название</h4>
                        <input type="text" name="name" placeholder="Введите текст" onChange={this.onChange} defaultValue={this.props.article.name}/>
                    </div>
                    <div className="input-form">
                        <h4>Содержание статьи</h4>
                        <Editor apiKey={tinyEditorSettings.apiKey} init={tinyEditorSettings.init} initialValue={this.props.article.content} onChange={this.onEditorChange} />
                    </div>
                    <button type="submit" className="hover-animation">Сохранить изменения</button>
                </form>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    article: state.articles.article,
});

export default connect(mapStateToProps, { hideLoader, showLoader, showHeader, showFooter, getArticle, updateArticle })(EditArticle);