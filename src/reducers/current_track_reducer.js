import {
  SET_CURRENT_TRACK
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return { ...state, ...action.payload };
  	default:
      return state;
  }

  return state;
}