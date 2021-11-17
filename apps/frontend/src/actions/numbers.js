import axios from "axios";
import {ADD_NUMBER, GET_NUMBERS} from "./types";
import {createMessage} from "./messages";
import {tokenConfig} from "./auth";

// GET_NUMBERS
export const getNumbers = () => (dispatch, getState) => {
    axios
        .get("/api/numbers/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_NUMBERS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// ADD_NUMBER
export const addNumber = (data) => (dispatch, getState) => {
    axios
        .post("/api/numbers/", data, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addNumber: "Заявка отправлена"}));
            dispatch({
                type: ADD_NUMBER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};
