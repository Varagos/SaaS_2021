import axios from "axios";
import {
    GET_QUESTIONS,
    GET_QUESTION,
    ADD_QUESTION,
    DELETE_QUESTION,
    QUESTIONS_LOADING,
    END_QUESTIONS_LOADING,
} from "./types";
import { browsing , questionDisplay, questionCreate } from "../constants/config";
import { tokenConfig } from "./authActions";
import {clearErrors, returnErrors} from "./errorActions";

//thunk comes in allowing us to do asynchronous request


export const getQuestionsPage = (page) => (dispatch, getState) => {
    dispatch(clearErrors())
    dispatch(setQuestionsLoading());
    axios.get(`${browsing}/questions/paginate?page=${page}`, tokenConfig(getState)).then((res) =>
        dispatch({
            type: GET_QUESTIONS,
            payload: res.data,
        })
    ).catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
};



export const getQuestion = (id) => (dispatch, getState) => {
    dispatch(clearErrors())
    dispatch(setQuestionsLoading());
    axios.get(`${questionDisplay}/question/${id}`, tokenConfig(getState)).then((res) =>
        dispatch({
            type: GET_QUESTION,
            payload: res.data,
        })
    ).catch(err => {
        dispatch(returnErrors(err.response.data.message, err.response.status))
        dispatch({
            type: END_QUESTIONS_LOADING
        })
    })
};


export const addQuestion = (question) => (dispatch, getState) => {
  dispatch(clearErrors())
  axios.post(`${questionCreate}/questions`, question, tokenConfig(getState)).then((res) =>
    dispatch({
      type: ADD_QUESTION,
      payload: res.data, // res.data if backend returned the newly added question
    })
  ).catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
};


export const deleteQuestion = (id) => (dispatch, getState) => {
  dispatch(clearErrors())
  axios.delete(`${questionCreate}/questions/${id}`, tokenConfig(getState)).then(() =>
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
