import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';
import { returnErrors } from './errorActions';
import { authenticator } from '../constants/config';

// Setup config/headers and token
export const tokenConfig = (getState) => {
  const { token } = getState().auth; // auth reducer

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Register User
export const register =
  ({ email, password }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Request body
    const body = JSON.stringify({ email, password });
    axios
      .post(`${authenticator}/auth/register`, body, config)
      .then((res) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            'REGISTER_FAIL'
          )
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  axios
    .get(`${authenticator}/auth/profile`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Login user
export const login =
  ({ email, password }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Request body
    const body = JSON.stringify({ email, password });
    axios
      .post(`${authenticator}/auth/login`, body, config)
      .then((res) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            'LOGIN_FAIL'
          )
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };
// Logout User
export const logout = () => ({
  type: LOGOUT_SUCCESS,
});
