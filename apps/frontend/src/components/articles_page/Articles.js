import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {deleteArticle, getArticles, invertArticleVisibility} from "../../actions/articles";

export class Articles extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        getArticles: PropTypes.func.isRequired,
        deleteArticle: PropTypes.func.isRequired,
        invertArticleVisibility: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getArticles();
    }

    render() {
        return (
            <Fragment>
                <div className="content-header"><h2 className="title">Статьи</h2></div>
                <div className="articles">
                    { this.props.articles.map(article => (
                        <div className="article" key={`article_${article.id}`}>
                            <Link to={`/articles/${article.id}/`}><h3 className="hover-animation">{article.name}</h3></Link>
                            <hr/>
                            <div className="action-buttons">
                                <button onClick={this.props.deleteArticle.bind(this, article.id)}
                                        className="hover-animation">Удалить
                                </button>
                                <Link to={`/articles/edit/${article.id}/`}
                                      className="hover-animation">Редактировать</Link>
                                <button onClick={this.props.invertArticleVisibility.bind(this, article.id)}
                                        className="hover-animation">
                                    {article.is_hidden ? ("Показать") : ("Скрыть")}
                                </button>
                            </div>
                        </div>
                    )) }
                    <button className="add-article-button hover-animation"><Link to="/articles/add/">Добавить статью</Link></button>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.articles.articles,
});

export default connect(mapStateToProps, { getArticles, deleteArticle, invertArticleVisibility })(Articles);