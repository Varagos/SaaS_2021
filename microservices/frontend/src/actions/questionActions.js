import axios from "axios";
import {
  GET_QUESTIONS,
  GET_QUESTION,
  ADD_QUESTION,
  DELETE_QUESTION,
  QUESTIONS_LOADING,
} from "./types";
//thunk comes in allowing us to do asynchronous request
export const getQuestions = () => (dispatch) => {
  dispatch(setQuestionsLoading());
  //https://jsonplaceholder.typicode.com/posts
  axios.get("http://localhost:3004/posts").then((res) =>
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data,
    })
  );
};

export const getQuestion = () => {
  return {
    type: GET_QUESTION,
  };
};
export const addQuestion = (question) => (dispatch) => {
  axios.post("http://localhost:3004/posts", question).then(() =>
    dispatch({
      type: ADD_QUESTION,
      payload: question, // res.data if backend returned the newly added question
    })
  );
};
export const deleteQuestion = (id) => (dispatch) => {
  axios.delete(`http://localhost:3004/posts/${id}`).then(() =>
    dispatch({
      type: DELETE_QUESTION,
      payload: id,
    })
  );
};

export const setQuestionsLoading = () => {
  return {
    type: QUESTIONS_LOADING,
  };
};
