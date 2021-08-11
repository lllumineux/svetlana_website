import axios from "axios";
import {
    ADD_ARTICLE,
    DELETE_ARTICLE,
    GET_ARTICLE,
    GET_ARTICLES,
    INVERT_ARTICLE_VISIBILITY,
    UPDATE_ARTICLE
} from "./types";


// GET_ARTICLES
export const getArticles = () => (dispatch) => {
  axios
    .get("/api/articles/")
    .then(res => {
      dispatch({
        type: GET_ARTICLES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET COURSE
export const getArticle = (id) => (dispatch) => {
  axios
    .get(`/api/articles/${id}/`)
    .then(res => {
      dispatch({
        type: GET_ARTICLE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// ADD_COURSE
export const addArticle = (data, callback_func) => (dispatch) => {
  axios
    .post(`/api/articles/`, data, {
    })
    .then(res => {
      dispatch({
        type: ADD_ARTICLE,
        payload: res.data
      });
      callback_func();
    })
    .catch((err) => console.log(err))
};

// DELETE COURSE
export const deleteArticle = (id) => (dispatch) => {
  axios
    .delete(`/api/articles/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_ARTICLE,
        payload: id
      });
    })
    .catch((err) => console.log(err));
};

// UPDATE_COURSE
export const updateArticle = (id, data, callback_func) => (dispatch) => {
  axios
    .patch(`/api/articles/${id}/`, data, {
    })
    .then(res => {
      dispatch({
        type: UPDATE_ARTICLE,
        payload: res.data
      });
      callback_func();
    })
    .catch((err) => console.log(err))
};

// INVERT_COURSE_VISIBILITY
export const invertArticleVisibility = (id) => (dispatch) => {
  axios
    .patch(`/api/articles/${id}/invert_visibility/`)
    .then(res => {
      dispatch({
        type: INVERT_ARTICLE_VISIBILITY,
        payload: id
      });
    })
    .catch((err) => console.log(err));
};
