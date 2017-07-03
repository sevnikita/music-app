import {
  GET_POST
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state, ...action.payload };
  	default:
      return state;
  }

  return state;
}