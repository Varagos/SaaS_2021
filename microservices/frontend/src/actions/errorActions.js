import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => ({
  type: GET_ERRORS,
  payload: { msg, status, id },
});

// CLEAR ERRORS
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

// Returns true if dispatch is viable
export const handleAxiosError = (error, dispatch) => {
  if (error.response) {
    // Request made and server responded
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    dispatch(returnErrors(error.response.data.message, error.response.status));
  }
  if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    dispatch(returnErrors('Service Unavailable', 503));
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
};
