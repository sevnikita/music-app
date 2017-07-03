import {
  SET_CURRENT_USER,
  DOWNLOAD_NEW_USER_PHOTO
} from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, ...action.payload };
  	case DOWNLOAD_NEW_USER_PHOTO:
  		return { ...state, photoURL: action.payload };
	default:
      return state;
  }
  return state;
}