import axios from "axios";
import {
  ADD_COMMENT,
} from "./types";
import { commentCreate } from "../constants/config";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";



export const addComment = (comment) => (dispatch, getState) => {
  axios.post(`${commentCreate}/comments`, comment, tokenConfig(getState)).then((res) =>
    dispatch({
      type: ADD_COMMENT,
      payload: res.data, // res.data if backend returned the newly added comment
    })
  ).catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
};


export const deleteQuestion = (id) => (dispatch, getState) => {
  axios.delete(`http://localhost:3004/posts/${id}`, tokenConfig(getState)).then(() =>
    dispatch({
      type: DELETE_QUESTION,
      payload: id,
    })
  ).catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
};

export const setQuestionsLoading = () => {
  return {
    type: QUESTIONS_LOADING,
  };
};
