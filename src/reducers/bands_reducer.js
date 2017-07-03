import {
  FETCH_BANDS
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BANDS:
      return action.payload;
  	default:
      return state;
  }

  return state;
}