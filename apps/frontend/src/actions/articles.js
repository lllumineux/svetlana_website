import axios from "axios";
import {
    ADD_ARTICLE,
    DELETE_ARTICLE,
    GET_ARTICLE,
    GET_ARTICLES,
    INVERT_ARTICLE_VISIBILITY,
    UPDATE_ARTICLE
} from "./types";
import {tokenConfig} from "./auth";


// GET_ARTICLES
export const getArticles = () => (dispatch, getState) => {
  axios
    .get("/api/articles/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ARTICLES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET_ARTICLE
export const getArticle = (id) => (dispatch, getState) => {
  axios
    .get(`/api/articles/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ARTICLE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// ADD_ARTICLE
export const addArticle = (data, callback_func) => (dispatch, getState) => {
  axios
    .post(`/api/articles/`, data, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_ARTICLE,
        payload: res.data
      });
      callback_func();
    })
    .catch((err) => console.log(err))
};

// DELETE_ARTICLE
export const deleteArticle = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/articles/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_ARTICLE,
        payload: id
      });
    })
    .catch((err) => console.log(err));
};

// UPDATE_ARTICLE
export const updateArticle = (id, data, callback_func) => (dispatch, getState) => {
  axios
    .patch(`/api/articles/${id}/`, data, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_ARTICLE,
        payload: res.data
      });
      callback_func();
    })
    .catch((err) => console.log(err))
};

// INVERT_ARTICLE_VISIBILITY
export const invertArticleVisibility = (id) => (dispatch, getState) => {
  axios
    .patch(`/api/articles/${id}/invert_visibility/`, {}, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: INVERT_ARTICLE_VISIBILITY,
        payload: id
      });
    })
    .catch((err) => console.log(err));
};
