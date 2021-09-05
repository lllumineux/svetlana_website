import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getArticle} from "../../actions/articles";
import {showFooter, showHeader} from "../../actions/page_management";

export class Article extends Component {
    static propTypes = {
        article: PropTypes.any.isRequired,
        getArticle: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.showHeader();
        this.props.showFooter();
        this.props.getArticle(this.props.location.pathname.split("/").filter(obj => obj !== "").pop());
    }

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Статья: «{this.props.article.name}»</h2></div>
                <div className="editor-rendered-content" dangerouslySetInnerHTML={{__html: this.props.article.content}}/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    article: state.articles.article,
});

export default connect(mapStateToProps, { showHeader, showFooter, getArticle })(Article);