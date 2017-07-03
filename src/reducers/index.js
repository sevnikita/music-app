import { combineReducers } from 'redux';
import postsReducer from './posts_reducer';
import postReducer from './post_reducer';
import usersReducer from './users_reducer';
import tracksReducer from './tracks_reducer';
import currentTrackReducer from './current_track_reducer';
import bandsReducer from './bands_reducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  posts: postsReducer,
  currentPost: postReducer,
  user:  usersReducer,
  tracks: tracksReducer,
  currentTrack: currentTrackReducer,
  bands: bandsReducer
});

export default rootReducer;
