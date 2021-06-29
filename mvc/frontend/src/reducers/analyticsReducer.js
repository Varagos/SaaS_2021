import {
  FETCH_QUESTIONS_LINE,
  QUESTIONS_LINE_LOADING,
  FETCH_QUESTIONS_BAR,
  QUESTIONS_BAR_LOADING,
  FETCH_KEYWORDS_BAR,
  KEYWORDS_BAR_LOADING,
  FETCH_USERS_LINE,
  USERS_LINE_LOADING,
  FETCH_USER_PROFILE,
  USER_PROFILE_LOADING,
} from '../actions/types';

const initialState = {
  questionsLine: {
    labels: [],
    datasets: [
      { label: '', data: [] },
      { label: '', data: [] },
    ],
  },
  questionsLineLoading: false,
  questionsBar: {
    labels: [],
    datasets: [
      { label: '', data: [] },
      { label: '', data: [] },
    ],
  },
  questionsBarLoading: false,
  keywordsBar: {
    labels: [],
    datasets: [{ label: '', data: [] }],
  },
  keywordsBarLoading: false,
  usersLine: {
    labels: [],
    datasets: [
      { label: '', data: [] },
      { label: '', data: [] },
    ],
  },
  usersLineLoading: false,
  profileInfo: { questions: [], comments: [] },
  profileLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_LINE:
      return {
        ...state,
        questionsLine: action.payload,
        questionsLineLoading: false,
      };
    case QUESTIONS_LINE_LOADING:
      return {
        ...state,
        questionsLineLoading: true,
      };
    case FETCH_QUESTIONS_BAR:
      return {
        ...state,
        questionsBar: action.payload,
        questionsBarLoading: false,
      };
    case QUESTIONS_BAR_LOADING:
      return {
        ...state,
        questionsBarLoading: true,
      };
    case FETCH_KEYWORDS_BAR:
      return {
        ...state,
        keywordsBar: action.payload,
        keywordsBarLoading: false,
      };
    case KEYWORDS_BAR_LOADING:
      return {
        ...state,
        keywordsBarLoading: true,
      };
    case FETCH_USERS_LINE:
      return {
        ...state,
        usersLine: action.payload,
        usersLineLoading: false,
      };
    case USERS_LINE_LOADING:
      return {
        ...state,
        usersLineLoading: true,
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        profileInfo: action.payload,
        profileLoading: false,
      };
    case USER_PROFILE_LOADING:
      return {
        ...state,
        profileLoading: true,
      };
    default:
      return state;
  }
};
