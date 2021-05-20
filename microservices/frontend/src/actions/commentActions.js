import axios from "axios";
import {
    ADD_COMMENT, DELETE_COMMENT,
} from "./types";
import { commentCreate } from "../constants/config";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import {getQuestion} from "./questionActions";



export const addComment = (comment) => (dispatch, getState) => {
  axios.post(`${commentCreate}/comments`, comment, tokenConfig(getState)).then((res) => {
        dispatch({
          type: ADD_COMMENT,
          payload: res.data, // res.data if backend returned the newly added comment
        })
      dispatch(getQuestion(comment.question_id))
      }
  ).catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
};

export const deleteComment = (id) => (dispatch, getState) => {
    axios.delete(`${commentCreate}/comments/${id}`, tokenConfig(getState)).then((res) => {
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data,
        })
        dispatch(getQuestion(res.data.question_id))
    }
    ).catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}


