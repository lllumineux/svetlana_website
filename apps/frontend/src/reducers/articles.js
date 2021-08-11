import {
  GET_ARTICLES,
  DELETE_ARTICLE,
  INVERT_ARTICLE_VISIBILITY,
  ADD_ARTICLE,
  GET_ARTICLE,
  UPDATE_ARTICLE
} from "../actions/types";

const initialState = {
  articles: [],
  article: {"id": "", "name": "", "content": "", "is_hidden": ""}
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(article => article.id !== action.payload)
      };
    case UPDATE_ARTICLE:
      return {
        ...state
      };
    case INVERT_ARTICLE_VISIBILITY:
      return {
        ...state,
        articles: state.articles.map(article => {
          article.is_hidden = (article.id === action.payload) ? !article.is_hidden : article.is_hidden;
          return article;
        })
      };
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [action.payload, ...state.articles]
      };
    default:
      return state;
  }
}