import {HIDE_FOOTER, HIDE_HEADER, SHOW_FOOTER, SHOW_HEADER} from "./types";

// SHOW HEADER
export const showHeader = () => (dispatch) => {
    dispatch({
        type: SHOW_HEADER,
        payload: null
    });
};

// HIDE HEADER
export const hideHeader = () => (dispatch) => {
    dispatch({
        type: HIDE_HEADER,
        payload: null
    });
};

// SHOW FOOTER
export const showFooter = () => (dispatch) => {
    dispatch({
        type: SHOW_FOOTER,
        payload: null
    });
};

// HIDE FOOTER
export const hideFooter = () => (dispatch) => {
    dispatch({
        type: HIDE_FOOTER,
        payload: null
    });
};
