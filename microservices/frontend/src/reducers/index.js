import { combineReducers } from "redux";
import questionReducer from "./questionReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import keywordReducer from "./keywordReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  question: questionReducer,
  error: errorReducer,
  auth: authReducer,
  keyword: keywordReducer,
  comment: commentReducer,
});
