import {
  FETCH_TRACKS,
  CREATE_TRACK
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TRACKS:
      return action.payload;
    case CREATE_TRACK:
      return { ...state, ...action.payload };
    default:
      return state;
  }

  return state;
}
