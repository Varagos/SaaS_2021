import {
  ADD_COMMENT, DELETE_COMMENT,
} from "../actions/types";

const initialState = {
  comment: null,
};

export default function (state = initialState, action) {
  //action is an object with a type attached
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comment: action.payload, //not really necessary could be removed
      };
    case DELETE_COMMENT:
        return {
          ...state
        }
    default:
      return state;
  }
}
