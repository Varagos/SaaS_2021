import axios from 'axios';
import {
  GET_QUESTIONS,
  GET_QUESTION,
  ADD_QUESTION,
  DELETE_QUESTION,
  QUESTIONS_LOADING,
  END_QUESTIONS_LOADING,
  ADD_COMMENT,
  DELETE_COMMENT,
} from './types';
import {
  browsing,
  questionDisplay,
  questionCreate,
  commentCreate,
} from '../constants/config';
import { tokenConfig } from './authActions';
import { clearErrors, returnErrors } from './errorActions';

export const setQuestionsLoading = () => ({
  type: QUESTIONS_LOADING,
});

// thunk comes in allowing us to do asynchronous request
export const getQuestionsPage =
  (page, keywords, start, end) => (dispatch, getState) => {
    // params: { page, ...(keywords && { keywords }) },
    dispatch(clearErrors());
    dispatch(setQuestionsLoading());
    console.log('keywords', keywords);
    let config;
    let url;
    const baseUrl = `${browsing}/questions`;
    if (start && end) {
      config = {
        ...tokenConfig(getState),
        params: { page, start, end },
      };
      console.log(start, end);
      url = `${baseUrl}/sort_dates`;
    } else if (keywords) {
      config = {
        ...tokenConfig(getState),
        params: { page, keywords },
      };
      url = `${baseUrl}/keywords`;
    } else {
      config = { params: { page } };
      url = `${baseUrl}/paginate`;
    }
    axios
      .get(url, config)
      .then((res) =>
        dispatch({
          type: GET_QUESTIONS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch(returnErrors(err.response.data.message, err.response.status))
      );
  };

export const getQuestion = (id) => (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch(setQuestionsLoading());
  axios
    .get(`${questionDisplay}/question/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_QUESTION,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(
        returnErrors(error.response.data.message, error.response.status)
      );
      dispatch({
        type: END_QUESTIONS_LOADING,
      });
    });
};

export const addQuestion = (question) => (dispatch, getState) => {
  dispatch(clearErrors());
  axios
    .post(`${questionCreate}/questions`, question, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_QUESTION,
        payload: res.data, // res.data if backend returned the newly added question
      })
    )
    .catch((error) =>
      dispatch(returnErrors(error.response.data.message, error.response.status))
    );
};

export const deleteQuestion = (id) => (dispatch, getState) => {
  dispatch(clearErrors());
  axios
    .delete(`${questionCreate}/questions/${id}`, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: DELETE_QUESTION,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data.message, err.response.status))
    );
};

export const addComment = (comment) => (dispatch, getState) => {
  axios
    .post(`${commentCreate}/comments`, comment, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
      // We need to call displayQuestion Service to show the new comment
      dispatch(getQuestion(res.data.question_id));
    })
    .catch((error) => {
      dispatch(
        returnErrors(error.response.data.message, error.response.status)
      );
    });
};

export const deleteComment = (id) => (dispatch, getState) => {
  axios
    .delete(`${commentCreate}/comments/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
      });
      dispatch(getQuestion(res.data.question_id));
    })
    .catch((error) =>
      dispatch(returnErrors(error.response.data.message, error.response.status))
    );
};
