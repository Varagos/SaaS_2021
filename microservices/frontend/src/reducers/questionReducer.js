import {
  GET_QUESTIONS,
  GET_QUESTION,
  ADD_QUESTION,
  DELETE_QUESTION,
  QUESTIONS_LOADING, END_QUESTIONS_LOADING,
} from "../actions/types";

const initialState = {
  questions: [],
  lastPage: null,
  question: null,
  loading: false,
};

export default function (state = initialState, action) {
  //action is an object with a type attached
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
        lastPage: action.payload.last,
        loading: false,
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
        loading: false
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question.question_id !== Number(action.payload)
        ),
        question: null,
      };
    case QUESTIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case END_QUESTIONS_LOADING:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
