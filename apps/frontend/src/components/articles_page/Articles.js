import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {deleteArticle, getArticles, invertArticleVisibility} from "../../actions/articles";
import {
    hideLoader,
    showFooter,
    showHeader
} from "../../actions/page_management";

export class Articles extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        getArticles: PropTypes.func.isRequired,
        deleteArticle: PropTypes.func.isRequired,
        invertArticleVisibility: PropTypes.func.isRequired,
    };

    componentDidMount() {
        (document.readyState === "complete") ? this.props.hideLoader() : window.addEventListener('load', this.props.hideLoader);
        this.props.showHeader();
        this.props.showFooter();
        this.props.getArticles();
    }

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Статьи</h2></div>
                <div className="articles">
                    <div className="article-promotion-text">Хотите прямо сейчас запустить внутренние трансформации? Тогда читайте это:</div>
                    { this.props.articles.map(article => (
                        <div className="article" key={`article_${article.id}`}>
                            <Link to={`/articles/${article.id}/`}><h3 className="hover-animation">{article.name}</h3></Link>
                            {this.props.auth.isAuthenticated && this.props.auth.user.is_staff ? (
                                <Fragment>
                                    <hr/>
                                    <div className="action-buttons">
                                        <button onClick={this.props.deleteArticle.bind(this, article.id)} className="hover-animation">Удалить</button>
                                        <Link to={`/articles/edit/${article.id}/`} className="hover-animation">Редактировать</Link>
                                        <button onClick={this.props.invertArticleVisibility.bind(this, article.id)} className="hover-animation">
                                            {article.is_hidden ? ("Показать") : ("Скрыть")}
                                        </button>
                                    </div>
                                </Fragment>
                            ) : ""}
                        </div>
                    )) }
                    {this.props.auth.isAuthenticated && this.props.auth.user.is_staff ? (
                        <Link to="/articles/add/"><button className="add-article-button hover-animation">Добавить статью</button></Link>
                    ) : ""}
                    </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.articles.articles,
    auth: state.auth
});

export default connect(mapStateToProps, { hideLoader, showHeader, showFooter, getArticles, deleteArticle, invertArticleVisibility })(Articles);
