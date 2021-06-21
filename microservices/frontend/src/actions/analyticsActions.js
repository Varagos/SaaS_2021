import axios from 'axios';
import {
  FETCH_QUESTIONS_LINE,
  QUESTIONS_LINE_LOADING,
  FETCH_QUESTIONS_BAR,
  QUESTIONS_BAR_LOADING,
  FETCH_KEYWORDS_BAR,
  KEYWORDS_BAR_LOADING,
  FETCH_USERS_LINE,
  USERS_LINE_LOADING,
  USER_PROFILE_LOADING,
  FETCH_USER_PROFILE,
} from './types';

import { analytics } from '../constants/config';

import { tokenConfig } from './authActions';
import { handleAxiosError } from './errorActions';

export const getQuestionsLine = (start, end) => (dispatch, getState) => {
  // dispatch(clearErrors());
  dispatch({ type: QUESTIONS_LINE_LOADING });
  let config = {
    ...tokenConfig(getState),
  };
  const url = `${analytics}/questions/count`;
  if (start && end) {
    config = {
      ...config,
      params: { start, end },
    };
  }
  axios
    .get(url, config)
    .then((res) =>
      dispatch({
        type: FETCH_QUESTIONS_LINE,
        payload: res.data,
      })
    )
    .catch((error) => handleAxiosError(error, dispatch));
};

export const getQuestionsBar = () => (dispatch, getState) => {
  // dispatch(clearErrors());
  dispatch({ type: QUESTIONS_BAR_LOADING });
  const config = {
    ...tokenConfig(getState),
  };
  const url = `${analytics}/questions/monthly_count`;
  axios
    .get(url, config)
    .then((res) =>
      dispatch({
        type: FETCH_QUESTIONS_BAR,
        payload: res.data,
      })
    )
    .catch((error) => handleAxiosError(error, dispatch));
};

export const getKeywordsBar = (start, end) => (dispatch, getState) => {
  // dispatch(clearErrors());
  dispatch({ type: KEYWORDS_BAR_LOADING });
  let config = {
    ...tokenConfig(getState),
  };
  const url = `${analytics}/keywords/most_used`;
  if (start && end) {
    config = {
      ...config,
      params: { start, end },
    };
  }
  axios
    .get(url, config)
    .then((res) =>
      dispatch({
        type: FETCH_KEYWORDS_BAR,
        payload: res.data,
      })
    )
    .catch((error) => handleAxiosError(error, dispatch));
};

export const getUsersLine = () => (dispatch, getState) => {
  dispatch({ type: USERS_LINE_LOADING });
  const config = {
    ...tokenConfig(getState),
  };
  const url = `${analytics}/users/hourly_avg`;
  axios
    .get(url, config)
    .then((res) =>
      dispatch({
        type: FETCH_USERS_LINE,
        payload: res.data,
      })
    )
    .catch((error) => handleAxiosError(error, dispatch));
};

export const getAccountPage = () => (dispatch, getState) => {
  // dispatch(clearErrors());
  dispatch({ type: USER_PROFILE_LOADING });
  const config = {
    ...tokenConfig(getState),
  };
  const url = `${analytics}/users/profile`;
  axios
    .get(url, config)
    .then((res) =>
      dispatch({
        type: FETCH_USER_PROFILE,
        payload: res.data,
      })
    )
    .catch((error) => handleAxiosError(error, dispatch));
};
