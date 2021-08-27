import axios from "axios";
import {ADD_NUMBER, GET_NUMBERS} from "./types";
import {createMessage} from "./messages";

// GET_NUMBERS
export const getNumbers = () => (dispatch) => {
    axios
        .get("/api/numbers/", {
        })
        .then(res => {
            dispatch({
                type: GET_NUMBERS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};

// ADD_NUMBER
export const addNumber = (data) => (dispatch) => {
    axios
        .post("/api/numbers/", data)
        .then(res => {
            dispatch(createMessage({addNumber: "Заявка отправлена"}));
            dispatch({
                type: ADD_NUMBER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err))
};
