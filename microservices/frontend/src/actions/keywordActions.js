import axios from 'axios';
import { GET_KEYWORDS, KEYWORDS_LOADING } from './types';

import { questionCreate } from '../constants/config';
import { tokenConfig } from './authActions';
import { handleAxiosError } from './errorActions';

export const setKeywordsLoading = () => ({
  type: KEYWORDS_LOADING,
});

// thunk comes in allowing us to do asynchronous request
export const getKeywords = () => (dispatch, getState) => {
  dispatch(setKeywordsLoading());
  axios
    .get(`${questionCreate}/keywords`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_KEYWORDS,
        payload: res.data,
      })
    )
    .catch((error) => handleAxiosError(error, dispatch));
};
