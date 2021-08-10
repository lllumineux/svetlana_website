import axios from "axios";
import {GET_NUMBERS} from "./types";

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
