import {
    HIDE_FOOTER,
    HIDE_HEADER, HIDE_LOADER,
    SHOW_FOOTER,
    SHOW_HEADER,
    SHOW_LOADER
} from "./types";

// SHOW HEADER
export const showHeader = () => (dispatch) => {
    dispatch({
        type: SHOW_HEADER,
        payload: true
    });
};

// HIDE HEADER
export const hideHeader = () => (dispatch) => {
    dispatch({
        type: HIDE_HEADER,
        payload: false
    });
};

// SHOW FOOTER
export const showFooter = () => (dispatch) => {
    dispatch({
        type: SHOW_FOOTER,
        payload: true
    });
};

// HIDE FOOTER
export const hideFooter = () => (dispatch) => {
    dispatch({
        type: HIDE_FOOTER,
        payload: false
    });
};

// SHOW LOADER
export const showLoader = () => (dispatch) => {
    dispatch({
        type: SHOW_LOADER,
        payload: true
    });
};

// HIDE LOADER
export const hideLoader = () => (dispatch) => {
    dispatch({
        type: HIDE_LOADER,
        payload: false
    });
};
