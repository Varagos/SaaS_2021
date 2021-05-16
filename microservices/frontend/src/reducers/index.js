import { combineReducers } from "redux";
import questionReducer from "./questionReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  question: questionReducer,
  error: errorReducer,
  auth: authReducer,
});
