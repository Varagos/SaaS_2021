import {
  ADD_COMMENT,
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
        comment: action.payload,
      };
    default:
      return state;
  }
}
