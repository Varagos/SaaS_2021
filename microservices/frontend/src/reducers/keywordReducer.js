import { GET_KEYWORDS, KEYWORDS_LOADING } from '../actions/types';

const initialState = {
  keywords: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_KEYWORDS:
      return {
        ...state,
        keywords: action.payload,
        loading: false,
      };
    case KEYWORDS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
